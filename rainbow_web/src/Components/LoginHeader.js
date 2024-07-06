import React from 'react'
import styled from 'styled-components';

function LoginHeader() {
  return (
    <Header>
        {/* Sincerely, logo svg file */}
        <svg width="186" height="36" viewBox="0 0 186 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_1093_2105)">
        <path d="M11.5515 17.6428C10.9527 17.4485 10.346 17.2517 9.83711 16.6894C6.41079 12.9032 19.162 7.52332 19.162 7.52332L15.0542 5.15144C15.0542 5.15144 7.5411 10.1757 4.13415 14.7023C2.12347 17.3738 -0.146787 22.1171 -0.146787 22.1171L8.46593 27.0899C8.46593 27.0899 15.6171 21.6984 13.3123 18.6958C12.8198 18.0542 12.1901 17.85 11.5515 17.6428Z" fill="#2C2C2C"/>
        <path d="M19.2196 18.7848C19.8184 18.9791 20.4251 19.1759 20.934 19.7382C24.3603 23.5244 11.6091 28.9043 11.6091 28.9043L15.9521 31.4117C15.9521 31.4117 23.4652 26.3875 26.8721 21.8608C28.8828 19.1893 31.1531 14.4461 31.1531 14.4461L22.3052 9.33772C22.3052 9.33772 15.154 14.7292 17.4588 17.7318C17.9513 18.3734 18.5809 18.5776 19.2196 18.7848Z" fill="#2C2C2C"/>
        </g>
        <path d="M46.16 25.32C45.1333 25.32 44.2333 25.1133 43.46 24.7C42.6867 24.2867 42.0733 23.7067 41.62 22.96C41.18 22.2133 40.92 21.3533 40.84 20.38L43.08 20.22C43.1733 20.8733 43.3533 21.4267 43.62 21.88C43.9 22.3333 44.2533 22.68 44.68 22.92C45.12 23.16 45.6267 23.28 46.2 23.28C46.7733 23.28 47.26 23.2067 47.66 23.06C48.06 22.9 48.36 22.6733 48.56 22.38C48.7733 22.0733 48.88 21.7267 48.88 21.34C48.88 20.9 48.78 20.5333 48.58 20.24C48.38 19.9333 48.0267 19.6533 47.52 19.4C47.0133 19.1467 46.2933 18.9 45.36 18.66C44.36 18.4067 43.5533 18.1067 42.94 17.76C42.34 17.4133 41.8867 16.9867 41.58 16.48C41.2867 15.9733 41.14 15.3533 41.14 14.62C41.14 13.8067 41.3333 13.0867 41.72 12.46C42.12 11.8333 42.6867 11.3467 43.42 11C44.1533 10.6533 45.0067 10.48 45.98 10.48C46.9133 10.48 47.7333 10.6733 48.44 11.06C49.16 11.4467 49.7333 11.9867 50.16 12.68C50.5867 13.3733 50.8533 14.1733 50.96 15.08L48.7 15.2C48.62 14.6667 48.4667 14.2 48.24 13.8C48.0133 13.4 47.7067 13.0867 47.32 12.86C46.9333 12.6333 46.4733 12.52 45.94 12.52C45.1667 12.52 44.5533 12.7067 44.1 13.08C43.6467 13.44 43.42 13.92 43.42 14.52C43.42 14.9333 43.5133 15.2733 43.7 15.54C43.8867 15.7933 44.1933 16.02 44.62 16.22C45.0467 16.42 45.66 16.62 46.46 16.82C47.6067 17.1133 48.52 17.46 49.2 17.86C49.88 18.26 50.3733 18.7467 50.68 19.32C51 19.88 51.16 20.5733 51.16 21.4C51.16 22.16 50.9467 22.84 50.52 23.44C50.1067 24.0267 49.52 24.4867 48.76 24.82C48.0133 25.1533 47.1467 25.32 46.16 25.32ZM57.6122 14.32H59.7722V25H57.6122V14.32ZM53.4322 23.16H63.3522V25H53.4322V23.16ZM53.6322 14.32H59.5322V16.16H53.6322V14.32ZM57.4922 10.74H59.7322V12.86H57.4922V10.74ZM65.8444 14.32H67.7844L67.8644 17.18L67.6044 17.04C67.791 16.0533 68.1844 15.3133 68.7844 14.82C69.3977 14.3267 70.1377 14.08 71.0044 14.08C72.1244 14.08 72.9777 14.4467 73.5644 15.18C74.151 15.9133 74.4444 16.8867 74.4444 18.1V25H72.3044V18.68C72.3044 17.7467 72.151 17.0533 71.8444 16.6C71.551 16.1467 71.0577 15.92 70.3644 15.92C69.6577 15.92 69.0844 16.1733 68.6444 16.68C68.2044 17.1733 67.9844 17.8667 67.9844 18.76V25H65.8444V14.32ZM82.1966 25.24C81.2099 25.24 80.3366 25.0133 79.5766 24.56C78.8299 24.1067 78.2499 23.46 77.8366 22.62C77.4232 21.7667 77.2166 20.78 77.2166 19.66C77.2166 18.54 77.4232 17.56 77.8366 16.72C78.2499 15.8667 78.8299 15.2133 79.5766 14.76C80.3366 14.3067 81.2099 14.08 82.1966 14.08C83.0099 14.08 83.7432 14.24 84.3966 14.56C85.0499 14.88 85.5899 15.34 86.0166 15.94C86.4432 16.5267 86.7232 17.2267 86.8566 18.04L84.6166 18.18C84.4566 17.5 84.1632 16.9733 83.7366 16.6C83.3232 16.2267 82.8099 16.04 82.1966 16.04C81.3432 16.04 80.6766 16.3667 80.1966 17.02C79.7166 17.66 79.4766 18.54 79.4766 19.66C79.4766 20.78 79.7166 21.6667 80.1966 22.32C80.6766 22.96 81.3432 23.28 82.1966 23.28C82.8366 23.28 83.3699 23.08 83.7966 22.68C84.2232 22.28 84.5099 21.72 84.6566 21L86.8966 21.14C86.6966 22.38 86.1699 23.3733 85.3166 24.12C84.4766 24.8667 83.4366 25.24 82.1966 25.24ZM94.0688 25.24C93.0821 25.24 92.2154 25.0133 91.4688 24.56C90.7221 24.1067 90.1421 23.46 89.7288 22.62C89.3154 21.7667 89.1088 20.78 89.1088 19.66C89.1088 18.54 89.3154 17.56 89.7288 16.72C90.1421 15.8667 90.7154 15.2133 91.4488 14.76C92.1954 14.3067 93.0554 14.08 94.0288 14.08C94.9488 14.08 95.7754 14.3 96.5088 14.74C97.2554 15.1667 97.8354 15.8067 98.2487 16.66C98.6754 17.5133 98.8888 18.5267 98.8888 19.7V20.22H91.3688C91.4488 21.22 91.7221 21.98 92.1888 22.5C92.6688 23.02 93.2954 23.28 94.0688 23.28C94.6688 23.28 95.1621 23.14 95.5488 22.86C95.9488 22.5667 96.2421 22.16 96.4288 21.64L98.6888 21.84C98.3688 22.8667 97.8021 23.6933 96.9888 24.32C96.1888 24.9333 95.2154 25.24 94.0688 25.24ZM96.5488 18.64C96.4554 17.8 96.1821 17.16 95.7288 16.72C95.2888 16.2667 94.7221 16.04 94.0288 16.04C93.3221 16.04 92.7421 16.2667 92.2888 16.72C91.8354 17.16 91.5421 17.8 91.4088 18.64H96.5488ZM104.321 14.32H105.861L106.041 17H105.881C106.001 16.1067 106.288 15.44 106.741 15C107.194 14.5467 107.808 14.32 108.581 14.32H110.921V16.22H108.741C108.234 16.22 107.808 16.3133 107.461 16.5C107.128 16.6867 106.874 16.9667 106.701 17.34C106.541 17.7 106.461 18.1467 106.461 18.68V25H104.321V14.32ZM101.681 23.16H109.721V25H101.681V23.16ZM101.681 14.32H105.441V16.16H101.681V14.32ZM118.053 25.24C117.066 25.24 116.2 25.0133 115.453 24.56C114.706 24.1067 114.126 23.46 113.713 22.62C113.3 21.7667 113.093 20.78 113.093 19.66C113.093 18.54 113.3 17.56 113.713 16.72C114.126 15.8667 114.7 15.2133 115.433 14.76C116.18 14.3067 117.04 14.08 118.013 14.08C118.933 14.08 119.76 14.3 120.493 14.74C121.24 15.1667 121.82 15.8067 122.233 16.66C122.66 17.5133 122.873 18.5267 122.873 19.7V20.22H115.353C115.433 21.22 115.706 21.98 116.173 22.5C116.653 23.02 117.28 23.28 118.053 23.28C118.653 23.28 119.146 23.14 119.533 22.86C119.933 22.5667 120.226 22.16 120.413 21.64L122.673 21.84C122.353 22.8667 121.786 23.6933 120.973 24.32C120.173 24.9333 119.2 25.24 118.053 25.24ZM120.533 18.64C120.44 17.8 120.166 17.16 119.713 16.72C119.273 16.2667 118.706 16.04 118.013 16.04C117.306 16.04 116.726 16.2667 116.273 16.72C115.82 17.16 115.526 17.8 115.393 18.64H120.533ZM129.525 13.92C129.525 13.52 129.412 13.2067 129.185 12.98C128.972 12.7533 128.659 12.64 128.245 12.64H125.785V10.8H128.365C129.459 10.8 130.279 11.08 130.825 11.64C131.385 12.1867 131.665 13.0067 131.665 14.1V25H129.525V13.92ZM125.385 23.16H135.305V25H125.385V23.16ZM138.398 26.16H139.758C140.118 26.16 140.384 26.1 140.558 25.98C140.744 25.8733 140.891 25.6933 140.998 25.44L141.338 24.56H140.678L136.838 14.32H139.158L142.078 22.5L144.798 14.32H147.118L142.918 26.08C142.678 26.76 142.324 27.2467 141.858 27.54C141.404 27.8467 140.784 28 139.998 28H138.398V26.16ZM149.73 25H148.57V22.28H151.29V24.7L149.97 28.14H148.75L149.73 25Z" fill="#2C2C2C"/>
        <defs>
        <clipPath id="clip0_1093_2105">
        <rect width="32" height="32" fill="white" transform="translate(0 2)"/>
        </clipPath>
        </defs>
        </svg>
    </Header>
  );
};

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  width: 95%;

  margin: 2rem;
`

export default LoginHeader;