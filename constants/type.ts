import { z, ZodObject } from "zod";
export const interactionParser = z.object({
  _id: z.string(),
  app: z.string(),
  version: z.number(),
  title: z.string(),
  description: z.string(),
  rewardDetail: z.string(),
  urlSlug: z.string(),
  frequency: z.number().optional(),

  type: z.enum(["friendship", "event", "game", "life"]),
  options: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  ),

  startDate: z.date().optional(),
  endDate: z.date().optional(),
  createdAt: z.date().optional(),
});
export type Interaction = z.infer<typeof interactionParser>;

export const friendParser = z.object({
  _id: z.string(),
  friend1Id: z.string(),
  friend2Id: z.string(),

  friendship: z.number(),

  images: z.array(z.string()),
  videos: z.array(z.string()),

  markdown: z.string(),
  userId: z.string().optional(),
});

const HttpsUrlSchema = z.custom((value) => {
  // Regular expressions to validate URLs
  const httpRegex = /^http:\/\/[^\s/$.?#].[^\s]*$/;
  const httpsRegex = /^https:\/\/[^\s/$.?#].[^\s]*$/;

  if (
    typeof value === "string" &&
    (value.match(httpRegex) || value.match(httpsRegex))
  ) {
    return value; // Valid URL with "http://" or "https://"
  } else {
    throw new Error("Invalid URL (must start with 'http://' or 'https://')");
  }
});

export type Friendship = z.infer<typeof friendshipParser>;

export const friendshipParser = z.object({
  _id: z.string(),
  adder: z.string(),
  accepter: z.string(),
  removed: z.boolean().optional(),

  friendship: z.number(),

  images: z.array(z.string()),
  videos: z.array(z.string()),

  // sameApps: z.array(
  createdAt: z.date().or(z.string()),
});

export const appParser = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),

  clientId: z.string(),
  clientSecret: z.string(),
  discordClientId: z.string().optional(),
  discordClientSecret: z.string().optional(),
  discordRedirectUri: z.string().optional(),
  discordScopes: z.array(z.string()).optional(),

  appStoreId: z.string().optional(),
  androidPackageName: z.string().optional(),
  url: z
    .string()
    .regex(/^(http:\/\/|https:\/\/)[^\s/$.?#].[^\s]*$/)
    .optional(),

  redirects: z.array(z.string().url()).optional(),

  image: z.string().optional(),
  users: z.array(z.string()),
  events: z.array(z.string()),
  interactions: z.array(z.string()),

  createdAt: z.date().or(z.string()),
});

export const appUserParser = z.object({
  _id: z.string(),
  app: z.string(),

  fyncId: z.string(),
  appUserId: z.string(),
  friends: z.array(z.string()),

  appInteraction: z.object({
    friendshipCount: z.number(),
    eventCount: z.number(),
    lastInteraction: z.date(),
  }),
  createdAt: z.date().or(z.string()),
});

export const createEmailUserParser = z.object({
  email: z.string(),
  password: z.string(),
});

export type CreateEmailUser = z.infer<typeof createEmailUserParser>;

export const createGoogleUserParser = z.object({
  sub: z.string(),
  name: z.string(),
  given_name: z.string(),
  family_name: z.string(),
  picture: z.string(),
  email: z.string(),
  email_verified: z.boolean(),
  locale: z.string(),
});

export type CreateGoogleUser = z.infer<typeof createGoogleUserParser>;

export const createDiscordUserParser = z.object({
  id: z.string(),
  username: z.string(),
  avatar: z.string(),
  discriminator: z.string(),
  public_flags: z.number(),
  flags: z.number(),
  locale: z.string(),
  mfa_enabled: z.boolean(),
  premium_type: z.number(),
  email: z.string(),
  verified: z.boolean(),
  phone: z.string(),
  access_token: z.string(),
  refresh_token: z.string(),
  expires_in: z.number(),
});

export const userParser = z.object({
  _id: z.string(),
  username: z.string(),
  images: z.array(z.string()),
  //   age: z.number(),
  birthdate: z.date(),
  provider: z
    .array(z.enum(["google", "facebook", "apple", "email"]))
    .optional(),

  history: z.array(z.string()).optional(),
  fights: z.array(z.string()).optional(),
  opponents: z.array(z.string()),

  activities: z.array(z.string()),
  interests: z.array(z.string()),

  locationHistory: z.array(z.string()),
});

export const chatParser = z.object({
  _id: z.string(),
  opponentId: z.string(),
  opponentImage: z.string(),
  opponentName: z.string(),
  matchAt: z.string(),
  logs: z.array(
    z.object({
      from: z.string(),
      message: z.string(),
      to: z.string(),
      time: z.string(),
    })
  ),
});

const fightParser = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  rule: z.string(),
  date: z.string(), // You might want to use z.date() if dates need to be validated
  location: z.string(),
  opponentId: z.string(),
  opponentImage: z.string(),
  inviterId: z.string(),
  inviterImage: z.string(),
  prize: z.string(),
  public: z.boolean(),
  spectators: z.array(z.string()),
});

export type Fight = z.infer<typeof fightParser>;
export type User = z.infer<typeof userParser>;
export type App = z.infer<typeof appParser>;
export type AppUser = z.infer<typeof appUserParser>;
export type Chat = z.infer<typeof chatParser>;
