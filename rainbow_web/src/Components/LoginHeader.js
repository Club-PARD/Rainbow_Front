import React from 'react'
import styled from 'styled-components';

function LoginHeader() {
  return (
    <Header>
        {/* Sincerely, logo svg file */}
        <svg width="186" height="40" viewBox="0 0 186 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M34.9476 20.2013C33.5483 23.2356 31.2475 26.1301 28.0452 28.8849C24.2596 32.1066 20.1033 34.2373 15.5761 35.2772L14.963 33.6145C21.2051 31.2498 25.3057 27.9434 27.2648 23.6954C27.8245 22.4817 27.1065 21.0467 25.1106 19.3903C22.502 17.2673 21.8974 14.6887 23.2968 11.6544C24.1014 9.90973 25.3525 8.69289 27.0501 8.00393C28.6369 7.35585 30.3406 7.45162 32.1611 8.29124C33.9817 9.13085 35.1724 10.7379 35.7332 13.1123C36.329 15.4109 36.0671 17.7739 34.9476 20.2013Z" fill="#2C2C2C"/>
        <path d="M16.703 28.3456C15.8984 30.0903 14.6648 31.2692 13.0022 31.8823C11.3804 32.6062 9.65927 32.5484 7.8387 31.7088C6.01813 30.8692 4.80996 29.3001 4.21418 27.0015C3.65338 24.6271 3.93273 22.2261 5.05222 19.7987C6.45158 16.7644 8.75239 13.8699 11.9546 11.1151C15.7402 7.89345 19.8966 5.76268 24.4237 4.72283L25.0368 6.38545C18.7948 8.75021 14.6942 12.0566 12.7351 16.3046C12.1753 17.5183 12.8934 18.9533 14.8892 20.6097C17.4978 22.7327 18.1024 25.3113 16.703 28.3456Z" fill="#2C2C2C"/>
        <path d="M55.44 28.384C54.224 28.384 53.152 28.144 52.224 27.664C51.296 27.168 50.552 26.48 49.992 25.6C49.448 24.704 49.128 23.672 49.032 22.504L51.456 22.336C51.568 23.152 51.8 23.848 52.152 24.424C52.504 24.984 52.96 25.416 53.52 25.72C54.08 26.008 54.736 26.152 55.488 26.152C56.224 26.152 56.848 26.056 57.36 25.864C57.872 25.672 58.256 25.392 58.512 25.024C58.784 24.64 58.92 24.192 58.92 23.68C58.92 23.136 58.792 22.68 58.536 22.312C58.296 21.928 57.856 21.576 57.216 21.256C56.576 20.92 55.648 20.592 54.432 20.272C53.216 19.936 52.248 19.568 51.528 19.168C50.808 18.752 50.272 18.256 49.92 17.68C49.584 17.088 49.416 16.352 49.416 15.472C49.416 14.512 49.648 13.664 50.112 12.928C50.576 12.176 51.24 11.6 52.104 11.2C52.968 10.784 53.984 10.576 55.152 10.576C56.288 10.576 57.272 10.808 58.104 11.272C58.952 11.736 59.624 12.384 60.12 13.216C60.632 14.032 60.952 14.976 61.08 16.048L58.656 16.192C58.56 15.52 58.368 14.928 58.08 14.416C57.792 13.904 57.4 13.512 56.904 13.24C56.408 12.952 55.808 12.808 55.104 12.808C54.112 12.808 53.32 13.048 52.728 13.528C52.152 13.992 51.864 14.608 51.864 15.376C51.864 15.888 51.976 16.312 52.2 16.648C52.424 16.968 52.808 17.256 53.352 17.512C53.896 17.752 54.688 18.016 55.728 18.304C57.12 18.672 58.216 19.096 59.016 19.576C59.832 20.056 60.424 20.632 60.792 21.304C61.176 21.96 61.368 22.776 61.368 23.752C61.368 24.648 61.12 25.448 60.624 26.152C60.128 26.856 59.432 27.408 58.536 27.808C57.64 28.192 56.608 28.384 55.44 28.384ZM69.2786 15.232H71.5826V28H69.2786V15.232ZM64.2146 26.008H75.9266V28H64.2146V26.008ZM64.4546 15.232H71.4386V17.224H64.4546V15.232ZM69.1106 10.912H71.5106V13.36H69.1106V10.912ZM79.0373 15.232H81.1253L81.2213 18.568L80.9573 18.376C81.1653 17.24 81.6373 16.384 82.3733 15.808C83.1253 15.232 84.0133 14.944 85.0373 14.944C86.4133 14.944 87.4613 15.392 88.1813 16.288C88.9013 17.168 89.2613 18.328 89.2613 19.768V28H86.9573V20.416C86.9573 19.248 86.7573 18.376 86.3573 17.8C85.9733 17.224 85.3413 16.936 84.4613 16.936C83.5333 16.936 82.7813 17.248 82.2053 17.872C81.6293 18.48 81.3413 19.344 81.3413 20.464V28H79.0373V15.232ZM98.6599 28.288C97.4919 28.288 96.4599 28.016 95.5639 27.472C94.6679 26.928 93.9719 26.152 93.4759 25.144C92.9959 24.12 92.7559 22.944 92.7559 21.616C92.7559 20.288 92.9959 19.12 93.4759 18.112C93.9719 17.088 94.6679 16.304 95.5639 15.76C96.4599 15.216 97.4919 14.944 98.6599 14.944C99.6359 14.944 100.5 15.128 101.252 15.496C102.02 15.848 102.644 16.368 103.124 17.056C103.62 17.744 103.956 18.568 104.132 19.528L101.732 19.696C101.54 18.864 101.172 18.224 100.628 17.776C100.1 17.312 99.4439 17.08 98.6599 17.08C97.5719 17.08 96.7159 17.488 96.0919 18.304C95.4679 19.104 95.1559 20.208 95.1559 21.616C95.1559 23.024 95.4679 24.136 96.0919 24.952C96.7159 25.752 97.5719 26.152 98.6599 26.152C99.4759 26.152 100.156 25.912 100.7 25.432C101.244 24.936 101.612 24.24 101.804 23.344L104.204 23.488C103.948 24.96 103.324 26.128 102.332 26.992C101.34 27.856 100.116 28.288 98.6599 28.288ZM112.931 28.288C111.747 28.288 110.707 28.016 109.811 27.472C108.931 26.928 108.251 26.152 107.771 25.144C107.291 24.136 107.051 22.96 107.051 21.616C107.051 20.272 107.291 19.096 107.771 18.088C108.251 17.08 108.923 16.304 109.787 15.76C110.667 15.216 111.691 14.944 112.859 14.944C113.963 14.944 114.947 15.208 115.811 15.736C116.691 16.248 117.371 17.016 117.851 18.04C118.347 19.048 118.595 20.256 118.595 21.664V22.264H109.451C109.531 23.544 109.875 24.512 110.483 25.168C111.091 25.824 111.907 26.152 112.931 26.152C113.699 26.152 114.331 25.976 114.827 25.624C115.339 25.256 115.707 24.752 115.931 24.112L118.379 24.304C118.011 25.504 117.347 26.472 116.387 27.208C115.427 27.928 114.275 28.288 112.931 28.288ZM116.099 20.416C115.987 19.328 115.643 18.504 115.067 17.944C114.507 17.368 113.771 17.08 112.859 17.08C111.947 17.08 111.195 17.368 110.603 17.944C110.011 18.504 109.635 19.328 109.475 20.416H116.099ZM125.305 15.232H127.057L127.273 18.448L127.081 18.424C127.225 17.352 127.561 16.552 128.089 16.024C128.633 15.496 129.369 15.232 130.297 15.232H133.009V17.296H130.417C129.793 17.296 129.265 17.416 128.833 17.656C128.417 17.88 128.105 18.224 127.897 18.688C127.689 19.136 127.585 19.696 127.585 20.368V28H125.305V15.232ZM122.065 26.008H131.569V28H122.065V26.008ZM122.065 15.232H126.529V17.224H122.065V15.232ZM141.712 28.288C140.528 28.288 139.488 28.016 138.592 27.472C137.712 26.928 137.032 26.152 136.552 25.144C136.072 24.136 135.832 22.96 135.832 21.616C135.832 20.272 136.072 19.096 136.552 18.088C137.032 17.08 137.704 16.304 138.568 15.76C139.448 15.216 140.472 14.944 141.64 14.944C142.744 14.944 143.728 15.208 144.592 15.736C145.472 16.248 146.152 17.016 146.632 18.04C147.128 19.048 147.376 20.256 147.376 21.664V22.264H138.232C138.312 23.544 138.656 24.512 139.264 25.168C139.872 25.824 140.688 26.152 141.712 26.152C142.48 26.152 143.112 25.976 143.608 25.624C144.12 25.256 144.488 24.752 144.712 24.112L147.16 24.304C146.792 25.504 146.128 26.472 145.168 27.208C144.208 27.928 143.056 28.288 141.712 28.288ZM144.88 20.416C144.768 19.328 144.424 18.504 143.848 17.944C143.288 17.368 142.552 17.08 141.64 17.08C140.728 17.08 139.976 17.368 139.384 17.944C138.792 18.504 138.416 19.328 138.256 20.416H144.88ZM155.598 14.536C155.598 14.04 155.454 13.656 155.166 13.384C154.894 13.096 154.51 12.952 154.014 12.952H151.038V10.96H154.134C155.382 10.96 156.318 11.28 156.942 11.92C157.582 12.544 157.902 13.472 157.902 14.704V28H155.598V14.536ZM150.558 26.008H162.27V28H150.558V26.008ZM166.245 29.608H167.805C168.237 29.608 168.557 29.536 168.765 29.392C168.989 29.264 169.165 29.048 169.293 28.744L169.725 27.616H168.981L164.325 15.232H166.821L170.493 25.456L173.925 15.232H176.421L171.333 29.44C171.077 30.192 170.685 30.736 170.157 31.072C169.645 31.424 168.941 31.6 168.045 31.6H166.245V29.608ZM179.724 28H178.38V24.928H181.452V27.664L179.916 31.744H178.572L179.724 28Z" fill="#2C2C2C"/>
        </svg>
    </Header>
  );
};

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  margin: 2rem;
`

export default LoginHeader;