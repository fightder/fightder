import { ViewStyle } from "react-native";
import { SvgXml } from "react-native-svg";

export function LogoMark(props: { style?: ViewStyle }) {
  return (
    <SvgXml
      style={{
        position: "absolute",
        margin: "auto",

        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
        // backgroundColor: "red",
        marginLeft: 10,
      }}
      xml={logomark}
      width={200}
      // width={30}
      // height={30}
    />
  );
}

const logomark = `<svg width="333" height="170" viewBox="0 0 333 170" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M91.6445 28.1193C88.4857 22.3489 83.726 21.3757 81.2913 21.4442C75.9456 21.5945 72.1679 23.807 69.4928 28.1193C66.5318 32.8926 64.5504 40.9805 65.5521 52.917C67.6702 78.1578 68.7281 101.074 69.257 117.679C69.5216 125.984 69.6541 132.72 69.7205 137.389C69.7537 139.723 69.7703 141.542 69.7787 142.781C69.7829 143.401 69.785 143.877 69.7861 144.2C69.7866 144.362 69.7868 144.485 69.787 144.569L69.7871 144.703V144.705V144.705C69.7871 151.188 63.8448 156.042 57.4922 154.75L10.5452 145.196C4.98984 144.066 1.41277 138.633 2.56895 133.083V133.083C3.71759 127.569 9.10662 124.021 14.6258 125.144L39.3258 130.17C44.9162 131.308 48.862 133.552 48.7659 127.848C48.7065 124.316 48.6381 120.366 48.573 118.322C48.052 101.966 47.0101 79.4119 44.9286 54.6076C43.7139 40.1333 45.7896 27.1988 51.8505 17.4284C58.1973 7.19701 68.4062 1.34463 80.7029 0.99893C94.3534 0.615172 104.933 9.41291 109.846 18.3863C113.104 24.3384 114.532 31.3597 115.13 38.1444C115.631 43.8369 110.896 48.4804 105.182 48.4804V48.4804C99.467 48.4804 95.054 43.8264 94.422 38.1468C94.018 34.5176 93.22 30.9973 91.6445 28.1193Z" fill="#FF3E3E"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M94.011 140.454L94.0053 75.0851C94.0049 69.3702 98.6376 64.7371 104.353 64.7371V64.7371C110.067 64.7371 114.699 69.3691 114.7 75.0833L114.705 140.793L114.699 140.975C114.65 142.338 115.086 144.568 116.226 146.155C116.719 146.84 117.332 147.402 118.179 147.827C118.993 148.234 120.36 148.684 122.594 148.724C124.035 148.604 125.045 148.255 125.933 147.527C126.92 146.72 128.945 144.464 130.409 138.281L130.422 138.224L144.128 83.2076C145.504 77.6875 151.08 74.3151 156.607 75.6603V75.6603C162.177 77.0159 165.581 82.6442 164.195 88.2069L150.544 143.002C148.374 152.126 144.548 158.847 139.135 163.279C133.672 167.751 127.791 168.908 123.539 169.162L123.228 169.18H122.916C111.992 169.18 104.104 164.61 99.3524 157.996C95.0645 152.027 93.8803 145.199 94.011 140.454Z" fill="#FF3E3E"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M257.881 28.1193C254.722 22.3489 249.962 21.3757 247.527 21.4442C242.182 21.5945 238.404 23.807 235.729 28.1193C232.768 32.8926 230.786 40.9805 231.788 52.917C233.906 78.1578 234.964 101.074 235.493 117.679C235.758 125.984 235.89 132.72 235.957 137.389C235.99 139.723 236.006 141.542 236.015 142.781C236.019 143.401 236.021 143.877 236.022 144.2C236.023 144.362 236.023 144.485 236.023 144.569L236.023 144.703V144.705V144.705C236.023 151.188 230.081 156.042 223.728 154.75L176.781 145.196C171.226 144.066 167.649 138.633 168.805 133.083V133.083C169.954 127.569 175.343 124.021 180.862 125.144L205.562 130.17C211.152 131.308 215.098 133.552 215.002 127.848C214.943 124.316 214.874 120.366 214.809 118.322C214.288 101.966 213.246 79.4119 211.165 54.6076C209.95 40.1333 212.026 27.1988 218.087 17.4284C224.433 7.19701 234.642 1.34463 246.939 0.99893C260.589 0.615172 271.17 9.41291 276.082 18.3863C279.34 24.3384 280.768 31.3597 281.366 38.1444C281.867 43.8369 277.132 48.4804 271.418 48.4804V48.4804C265.703 48.4804 261.29 43.8264 260.658 38.1468C260.254 34.5176 259.456 30.9973 257.881 28.1193Z" fill="#0047FF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M260.247 140.454L260.241 75.0851C260.241 69.3702 264.874 64.7371 270.589 64.7371V64.7371C276.303 64.7371 280.935 69.3691 280.936 75.0833L280.941 140.793L280.935 140.975C280.886 142.338 281.322 144.568 282.462 146.155C282.955 146.84 283.569 147.402 284.415 147.827C285.229 148.234 286.596 148.684 288.83 148.724C290.271 148.604 291.281 148.255 292.169 147.527C293.156 146.72 295.181 144.464 296.645 138.281L296.658 138.224L310.365 83.2076C311.74 77.6875 317.316 74.3151 322.843 75.6603V75.6603C328.413 77.0159 331.817 82.6442 330.432 88.2069L316.78 143.002C314.61 152.126 310.784 158.847 305.371 163.279C299.908 167.751 294.027 168.908 289.775 169.162L289.464 169.18H289.152C278.228 169.18 270.34 164.61 265.588 157.996C261.301 152.027 260.116 145.199 260.247 140.454Z" fill="#0047FF"/>
</svg>
`;
