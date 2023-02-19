import React from "react";
import { useMemo } from "react";
import { useAsterController } from "../context";
import { VImage } from "../form";
import { getBrighterColor } from "../utils/string";

const BBadge = (props) => {

  const { index, className } = props;

  const [controller] = useAsterController();
  const { themes } = controller;

  const customUrl = themes.find(t => t.name === `badge${index}_url`)?.value;
  const colorMain1 = useMemo(() => themes.find(v => v.name === 'color_main1')?.value || '#F76060', [themes]);
  const colorLight = getBrighterColor(colorMain1, 10);

  return customUrl ?
    <VImage key={index} src={customUrl} className={className} />
    :
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 154 202" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M120.921 124.817H33.0071V193.916C33.0071 196.406 34.3001 198.717 36.4211 200.02C38.5431 201.323 41.1891 201.43 43.4091 200.304C56.4071 193.712 76.9641 183.286 76.9641 183.286C76.9641 183.286 97.5211 193.712 110.519 200.304C112.739 201.43 115.385 201.323 117.507 200.02C119.628 198.717 120.921 196.406 120.921 193.916C120.921 171.548 120.921 124.817 120.921 124.817Z" fill="#DBE4E4" />
      <path d="M120.921 152.056C119.518 152.019 118.109 152 116.693 152C83.3027 152 53.3557 162.427 33.0071 178.927V193.916C33.0071 196.406 34.3 198.717 36.4211 200.02C38.543 201.323 41.189 201.43 43.4092 200.304L76.9641 183.286L110.519 200.304C112.739 201.43 115.385 201.323 117.507 200.02C119.628 198.717 120.921 196.406 120.921 193.916V152.056Z" fill="#EDF1F1" />

      {/* 4 vertical bars */}
      <path d="M52.2971 135.578C52.2971 134.75 51.6255 134.078 50.7971 134.078C49.9687 134.078 49.2971 134.75 49.2971 135.578H52.2971ZM49.2971 173.268C49.2971 174.097 49.9687 174.768 50.7971 174.768C51.6255 174.768 52.2971 174.097 52.2971 173.268H49.2971ZM69.7419 135.578C69.7419 134.75 69.0704 134.078 68.2419 134.078C67.4135 134.078 66.7419 134.75 66.7419 135.578H69.7419ZM66.7419 166.376C66.7419 167.205 67.4135 167.876 68.2419 167.876C69.0704 167.876 69.7419 167.205 69.7419 166.376H66.7419ZM87.187 135.578C87.187 134.75 86.5154 134.078 85.687 134.078C84.8586 134.078 84.187 134.75 84.187 135.578H87.187ZM84.187 166.376C84.187 167.205 84.8586 167.876 85.687 167.876C86.5154 167.876 87.187 167.205 87.187 166.376H84.187ZM104.631 135.578C104.631 134.75 103.96 134.078 103.131 134.078C102.303 134.078 101.631 134.75 101.631 135.578H104.631ZM101.631 173.268C101.631 174.097 102.303 174.768 103.131 174.768C103.96 174.768 104.631 174.097 104.631 173.268H101.631ZM49.2971 135.578V173.268H52.2971V135.578H49.2971ZM66.7419 135.578V166.376H69.7419V135.578H66.7419ZM84.187 135.578V166.376H87.187V135.578H84.187ZM101.631 135.578V173.268H104.631V135.578H101.631Z" fill={colorMain1} />

      {/* Right dark circle */}
      <path fill-rule="evenodd" clip-rule="evenodd" d="M71.847 1.505C73.281 0.525 74.978 0 76.714 0C78.451 0 80.148 0.525 81.581 1.505L93.027 9.331C93.5 9.654 94.025 9.895 94.579 10.044C95.133 10.192 95.707 10.246 96.279 10.202L110.104 9.148C111.836 9.016 113.567 9.41 115.072 10.278C116.576 11.147 117.783 12.449 118.534 14.015L124.534 26.515C124.782 27.032 125.116 27.503 125.521 27.908C125.926 28.314 126.397 28.647 126.914 28.896L139.414 34.895C140.98 35.647 142.283 36.853 143.151 38.358C144.02 39.862 144.413 41.593 144.281 43.325L143.227 57.15C143.184 57.722 143.237 58.297 143.385 58.85C143.534 59.404 143.775 59.929 144.098 60.402L151.924 71.848C152.904 73.282 153.429 74.978 153.429 76.715C153.429 78.452 152.904 80.148 151.924 81.582L144.098 93.028C143.775 93.501 143.534 94.026 143.385 94.579C143.237 95.133 143.184 95.708 143.227 96.28L144.281 110.105C144.413 111.837 144.02 113.568 143.151 115.072C142.283 116.576 140.98 117.783 139.414 118.535L126.914 124.534C126.397 124.782 125.926 125.116 125.521 125.521C125.116 125.927 124.782 126.398 124.534 126.915L118.534 139.415C117.783 140.981 116.576 142.283 115.072 143.152C113.567 144.02 111.836 144.414 110.104 144.282L96.279 143.228C95.707 143.184 95.133 143.238 94.579 143.386C94.025 143.534 93.5 143.775 93.027 144.099L81.581 151.925C80.148 152.905 78.451 153.429 76.714 153.429C74.978 153.429 73.281 152.905 71.847 151.925L60.402 144.099C59.928 143.775 59.404 143.534 58.85 143.386C58.296 143.238 57.721 143.184 57.15 143.228L43.324 144.282C41.593 144.414 39.861 144.02 38.357 143.152C36.853 142.283 35.646 140.981 34.895 139.415L28.895 126.915C28.647 126.398 28.313 125.927 27.908 125.521C27.502 125.116 27.031 124.782 26.514 124.534L14.014 118.535C12.448 117.783 11.146 116.576 10.278 115.072C9.409 113.568 9.015 111.837 9.147 110.105L10.202 96.28C10.245 95.708 10.192 95.133 10.043 94.579C9.895 94.026 9.654 93.501 9.33 93.028L1.505 81.582C0.523997 80.148 0 78.452 0 76.715C0 74.978 0.523997 73.282 1.505 71.848L9.33 60.402C9.654 59.929 9.895 59.404 10.043 58.85C10.192 58.297 10.245 57.722 10.202 57.15L9.147 43.325C9.015 41.593 9.409 39.862 10.278 38.358C11.146 36.853 12.448 35.647 14.014 34.895L26.514 28.896C27.031 28.647 27.502 28.314 27.908 27.908C28.313 27.503 28.647 27.032 28.895 26.515L34.895 14.015C35.646 12.449 36.853 11.147 38.357 10.278C39.861 9.41 41.593 9.016 43.324 9.148L57.15 10.202C57.721 10.246 58.296 10.192 58.85 10.044C59.404 9.895 59.928 9.654 60.402 9.331L71.847 1.505Z" fill={colorMain1} />

      {/* Left light circle */}
      <path d="M30.666 130.605L28.895 126.915C28.647 126.398 28.313 125.927 27.908 125.521C27.502 125.116 27.031 124.782 26.5139 124.534L14.0139 118.535C12.448 117.783 11.146 116.576 10.2781 115.072C9.40894 113.568 9.01489 111.837 9.14697 110.105L10.2019 96.28C10.2451 95.708 10.1919 95.1331 10.043 94.579C9.89502 94.026 9.65405 93.501 9.33008 93.028L1.50488 81.582C0.523926 80.1479 0 78.452 0 76.715C0 74.978 0.523926 73.282 1.50488 71.848L9.33008 60.402C9.65405 59.929 9.89502 59.4041 10.043 58.85C10.1919 58.297 10.2451 57.722 10.2019 57.15L9.14697 43.325C9.01489 41.593 9.40894 39.8619 10.2781 38.358C11.146 36.853 12.448 35.647 14.0139 34.895L26.5139 28.896C27.031 28.647 27.502 28.314 27.908 27.908C28.313 27.5031 28.647 27.032 28.895 26.515L34.895 14.015C35.646 12.449 36.853 11.147 38.3569 10.278C39.8611 9.41003 41.593 9.01599 43.324 9.14795L57.1499 10.202C57.7209 10.246 58.2959 10.192 58.8501 10.0439C59.4041 9.89502 59.928 9.65405 60.4021 9.33105L71.8469 1.505C73.281 0.525024 74.978 0 76.7141 0C78.4509 0 80.1479 0.525024 81.5811 1.505L93.0271 9.33105C93.5 9.65405 94.0249 9.89502 94.5791 10.0439C95.1331 10.192 95.707 10.246 96.2791 10.202L110.104 9.14795C111.836 9.01599 113.567 9.41003 115.072 10.278C116.576 11.147 117.783 12.449 118.534 14.015L124.534 26.515C124.668 26.7955 124.828 27.0625 125.011 27.3127C125.165 27.5237 125.336 27.7228 125.521 27.908C125.926 28.314 126.397 28.647 126.914 28.896L131.92 31.2985C123.087 82.5066 82.2004 122.744 30.666 130.605Z" fill={colorLight} />
      <mask id="mask0_943_73496" maskUnits="userSpaceOnUse" x="0" y="0" width="154" height="154">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M71.847 1.505C73.281 0.525 74.978 0 76.714 0C78.451 0 80.148 0.525 81.581 1.505L93.027 9.331C93.5 9.654 94.025 9.895 94.579 10.044C95.133 10.192 95.707 10.246 96.279 10.202L110.104 9.148C111.836 9.016 113.567 9.41 115.072 10.278C116.576 11.147 117.783 12.449 118.534 14.015L124.534 26.515C124.782 27.032 125.116 27.503 125.521 27.908C125.926 28.314 126.397 28.647 126.914 28.896L139.414 34.895C140.98 35.647 142.283 36.853 143.151 38.358C144.02 39.862 144.413 41.593 144.281 43.325L143.227 57.15C143.184 57.722 143.237 58.297 143.385 58.85C143.534 59.404 143.775 59.929 144.098 60.402L151.924 71.848C152.904 73.282 153.429 74.978 153.429 76.715C153.429 78.452 152.904 80.148 151.924 81.582L144.098 93.028C143.775 93.501 143.534 94.026 143.385 94.579C143.237 95.133 143.184 95.708 143.227 96.28L144.281 110.105C144.413 111.837 144.02 113.568 143.151 115.072C142.283 116.576 140.98 117.783 139.414 118.535L126.914 124.534C126.397 124.782 125.926 125.116 125.521 125.521C125.116 125.927 124.782 126.398 124.534 126.915L118.534 139.415C117.783 140.981 116.576 142.283 115.072 143.152C113.567 144.02 111.836 144.414 110.104 144.282L96.279 143.228C95.707 143.184 95.133 143.238 94.579 143.386C94.025 143.534 93.5 143.775 93.027 144.099L81.581 151.925C80.148 152.905 78.451 153.429 76.714 153.429C74.978 153.429 73.281 152.905 71.847 151.925L60.402 144.099C59.928 143.775 59.404 143.534 58.85 143.386C58.296 143.238 57.721 143.184 57.15 143.228L43.324 144.282C41.593 144.414 39.861 144.02 38.357 143.152C36.853 142.283 35.646 140.981 34.895 139.415L28.895 126.915C28.647 126.398 28.313 125.927 27.908 125.521C27.502 125.116 27.031 124.782 26.514 124.534L14.014 118.535C12.448 117.783 11.146 116.576 10.278 115.072C9.409 113.568 9.015 111.837 9.147 110.105L10.202 96.28C10.245 95.708 10.192 95.133 10.043 94.579C9.895 94.026 9.654 93.501 9.33 93.028L1.505 81.582C0.523997 80.148 0 78.452 0 76.715C0 74.978 0.523997 73.282 1.505 71.848L9.33 60.402C9.654 59.929 9.895 59.404 10.043 58.85C10.192 58.297 10.245 57.722 10.202 57.15L9.147 43.325C9.015 41.593 9.409 39.862 10.278 38.358C11.146 36.853 12.448 35.647 14.014 34.895L26.514 28.896C27.031 28.647 27.502 28.314 27.908 27.908C28.313 27.503 28.647 27.032 28.895 26.515L34.895 14.015C35.646 12.449 36.853 11.147 38.357 10.278C39.861 9.41 41.593 9.016 43.324 9.148L57.15 10.202C57.721 10.246 58.296 10.192 58.85 10.044C59.404 9.895 59.928 9.654 60.402 9.331L71.847 1.505Z" fill="#43B8B1" />
      </mask>
      <g mask="url(#mask0_943_73496)">
        <path d="M6.68396 27.6221C10.0469 30.3725 13.1523 32.0355 17.4561 32.517C22.4685 33.0777 27.6546 30.3784 31.6341 27.4226C36.2486 23.9951 40.9972 20.4077 45.119 16.3689C49.2714 12.3003 54.7916 8.82126 60.3472 7.35235C70.9381 4.5521 83.4518 8.55053 91.0501 16.3312C94.1086 19.4631 98.031 24.1785 97.7176 28.9463C97.4298 33.3233 94.2053 36.4035 90.5163 38.1973C85.8966 40.4435 80.1417 39.9806 75.2029 39.7599C69.6044 39.5097 64.021 37.7797 58.3976 38.3688C53.2273 38.9104 48.3723 40.5112 43.5144 42.3795C37.2593 44.7852 31.3921 47.324 26.9618 52.709C23.0781 57.4296 21.3945 63.5116 17.1568 67.9838C13.0086 72.3615 7.97841 75.7146 2.60502 78.2484C-0.0699761 79.5098 -2.92524 80.4649 -5.82632 80.9567C-7.7365 81.2804 -9.67707 81.0676 -11.5839 81.42C-17.4392 82.5019 -18.7852 89.1455 -17.1638 94.1369C-15.4116 99.5308 -10.5701 106.447 -5.12352 108.387C1.85645 110.874 10.5633 107.715 16.3601 103.477C24.1454 97.7849 29.0562 89.0544 36.8422 83.4C44.1815 78.07 52.4446 74.1272 61.5305 74.9813C64.5448 75.2646 67.5262 75.8972 70.2655 77.2227C72.7325 78.4164 75.0722 79.5312 77.7923 80.0064C84.9968 81.2648 92.1154 79.2559 98.6253 75.9991C102.565 74.0283 106.448 71.8867 109.534 68.6198C112.523 65.4544 114.895 61.7461 117.656 58.3808C122.433 52.5572 128.171 47.6299 135.864 47.6626C141.815 47.6879 147.472 49.1072 149.69 55.3507C152.337 62.8045 148.992 70.1417 144.466 76.0587C138.484 83.8807 130.651 89.2581 122.023 93.5704C118.447 95.3576 114.618 96.7506 110.712 97.5083C105.908 98.4399 100.932 97.7905 96.114 97.4821C87.4873 96.9298 78.2405 95.52 70.3967 100.297C64.3029 104.009 61.6908 110.042 58.0246 115.952C54.3279 121.911 49.7546 127.636 43.8912 131.45C37.5203 135.595 30.6635 135.882 23.4771 134.627M73.6931 161C75.1154 151.484 79.883 143.398 86.0402 137.258C93.7605 129.561 102.245 126.216 112.104 124.835C119.555 123.791 127.648 123.185 134.082 118.098C140.69 112.873 147.544 105.306 149.693 96.0001" stroke="#FFBE40" stroke-width="1.5" stroke-linecap="round" />
      </g>
      <path d="M76.7141 131.819C107.147 131.819 131.818 107.148 131.818 76.7148C131.818 46.2817 107.147 21.6108 76.7141 21.6108C46.281 21.6108 21.6101 46.2817 21.6101 76.7148C21.6101 107.148 46.281 131.819 76.7141 131.819Z" fill="#DBE4E4" />
      <path opacity="0.5" d="M109.693 42.9999C109.693 79.4507 80.1439 109 43.6931 109C39.4306 109 35.2625 108.596 31.225 107.824C25.159 98.9708 21.6101 88.2573 21.6101 76.7148C21.6101 46.2817 46.281 21.6108 76.7141 21.6108C88.6671 21.6108 99.7312 25.4167 108.761 31.8826C109.374 35.4969 109.693 39.2111 109.693 42.9999Z" fill="white" />

      {/* Check */}
      <path d="M56 65.095L73.094 81.122L103.011 48" stroke="#F99F19" stroke-width="10" stroke-miterlimit="1.5" stroke-linecap="round" strokeLinejoin="round" />

      {/* Text */}
      {
        index === 1 && <path d="M59.0743 113V103.662H56.2743L54.0063 109.304L51.7383 103.662H48.9523V113H50.9403V106.462L53.5723 113H54.4403L57.0723 106.462V113H59.0743ZM64.0229 113.168C66.2629 113.168 67.6069 111.544 67.6069 109.612C67.6069 107.694 66.2629 106.07 64.0229 106.07C61.7969 106.07 60.4529 107.694 60.4529 109.612C60.4529 111.544 61.7969 113.168 64.0229 113.168ZM64.0229 111.586C62.9169 111.586 62.3009 110.676 62.3009 109.612C62.3009 108.562 62.9169 107.652 64.0229 107.652C65.1289 107.652 65.7589 108.562 65.7589 109.612C65.7589 110.676 65.1289 111.586 64.0229 111.586ZM75.3659 113V103.662H73.5739V107.106C73.0419 106.42 72.2859 106.07 71.4879 106.07C69.7659 106.07 68.4919 107.414 68.4919 109.626C68.4919 111.88 69.7799 113.168 71.4879 113.168C72.2999 113.168 73.0419 112.804 73.5739 112.132V113H75.3659ZM72.0339 111.586C71.0259 111.586 70.3259 110.788 70.3259 109.626C70.3259 108.45 71.0259 107.652 72.0339 107.652C72.6359 107.652 73.2799 107.974 73.5739 108.422V110.816C73.2799 111.264 72.6359 111.586 72.0339 111.586ZM83.4711 113V106.238H81.6931V110.816C81.3851 111.208 80.8391 111.586 80.1531 111.586C79.3971 111.586 78.9071 111.278 78.9071 110.34V106.238H77.1291V111.04C77.1291 112.356 77.8291 113.168 79.3131 113.168C80.4191 113.168 81.2311 112.664 81.6931 112.146V113H83.4711ZM87.0145 113V103.662H85.2365V113H87.0145ZM91.9555 113.168C93.0055 113.168 94.0695 112.846 94.7415 112.23L93.9575 111.082C93.5235 111.502 92.7255 111.754 92.1515 111.754C91.0035 111.754 90.3175 111.04 90.2055 110.186H95.2315V109.794C95.2315 107.582 93.8595 106.07 91.8435 106.07C89.7855 106.07 88.3435 107.652 88.3435 109.612C88.3435 111.782 89.8975 113.168 91.9555 113.168ZM93.5095 108.982H90.1775C90.2615 108.31 90.7375 107.484 91.8435 107.484C93.0195 107.484 93.4675 108.338 93.5095 108.982ZM104.046 113V103.662H102.31L99.3698 106.616L100.504 107.806L102.058 106.224V113H104.046Z" fill={colorMain1} />
      }
      {
        index === 2 && <path d="M57.255 113V103.662H54.455L52.187 109.304L49.919 103.662H47.133V113H49.121V106.462L51.753 113H52.621L55.253 106.462V113H57.255ZM62.2035 113.168C64.4435 113.168 65.7875 111.544 65.7875 109.612C65.7875 107.694 64.4435 106.07 62.2035 106.07C59.9775 106.07 58.6335 107.694 58.6335 109.612C58.6335 111.544 59.9775 113.168 62.2035 113.168ZM62.2035 111.586C61.0975 111.586 60.4815 110.676 60.4815 109.612C60.4815 108.562 61.0975 107.652 62.2035 107.652C63.3095 107.652 63.9395 108.562 63.9395 109.612C63.9395 110.676 63.3095 111.586 62.2035 111.586ZM73.5466 113V103.662H71.7546V107.106C71.2226 106.42 70.4666 106.07 69.6686 106.07C67.9466 106.07 66.6726 107.414 66.6726 109.626C66.6726 111.88 67.9606 113.168 69.6686 113.168C70.4806 113.168 71.2226 112.804 71.7546 112.132V113H73.5466ZM70.2146 111.586C69.2066 111.586 68.5066 110.788 68.5066 109.626C68.5066 108.45 69.2066 107.652 70.2146 107.652C70.8166 107.652 71.4606 107.974 71.7546 108.422V110.816C71.4606 111.264 70.8166 111.586 70.2146 111.586ZM81.6517 113V106.238H79.8737V110.816C79.5657 111.208 79.0197 111.586 78.3337 111.586C77.5777 111.586 77.0877 111.278 77.0877 110.34V106.238H75.3097V111.04C75.3097 112.356 76.0097 113.168 77.4937 113.168C78.5997 113.168 79.4117 112.664 79.8737 112.146V113H81.6517ZM85.1952 113V103.662H83.4172V113H85.1952ZM90.1362 113.168C91.1862 113.168 92.2502 112.846 92.9222 112.23L92.1382 111.082C91.7042 111.502 90.9062 111.754 90.3322 111.754C89.1842 111.754 88.4982 111.04 88.3862 110.186H93.4122V109.794C93.4122 107.582 92.0402 106.07 90.0242 106.07C87.9662 106.07 86.5242 107.652 86.5242 109.612C86.5242 111.782 88.0782 113.168 90.1362 113.168ZM91.6902 108.982H88.3582C88.4422 108.31 88.9182 107.484 90.0242 107.484C91.2002 107.484 91.6482 108.338 91.6902 108.982ZM105.082 113V111.25H101.274C103.696 109.486 105.012 108.1 105.012 106.504C105.012 104.642 103.43 103.522 101.442 103.522C100.14 103.522 98.7545 103.998 97.8445 105.048L98.9785 106.364C99.6085 105.706 100.42 105.286 101.484 105.286C102.254 105.286 102.996 105.692 102.996 106.504C102.996 107.652 101.876 108.618 98.0545 111.446V113H105.082Z" fill={colorMain1} />
      }
      {
        index === 3 && <path d="M57.3439 113V103.662H54.5439L52.2759 109.304L50.0079 103.662H47.2219V113H49.2099V106.462L51.8419 113H52.7099L55.3419 106.462V113H57.3439ZM62.2924 113.168C64.5324 113.168 65.8764 111.544 65.8764 109.612C65.8764 107.694 64.5324 106.07 62.2924 106.07C60.0664 106.07 58.7224 107.694 58.7224 109.612C58.7224 111.544 60.0664 113.168 62.2924 113.168ZM62.2924 111.586C61.1864 111.586 60.5704 110.676 60.5704 109.612C60.5704 108.562 61.1864 107.652 62.2924 107.652C63.3984 107.652 64.0284 108.562 64.0284 109.612C64.0284 110.676 63.3984 111.586 62.2924 111.586ZM73.6355 113V103.662H71.8435V107.106C71.3115 106.42 70.5555 106.07 69.7575 106.07C68.0355 106.07 66.7615 107.414 66.7615 109.626C66.7615 111.88 68.0495 113.168 69.7575 113.168C70.5695 113.168 71.3115 112.804 71.8435 112.132V113H73.6355ZM70.3035 111.586C69.2955 111.586 68.5955 110.788 68.5955 109.626C68.5955 108.45 69.2955 107.652 70.3035 107.652C70.9055 107.652 71.5495 107.974 71.8435 108.422V110.816C71.5495 111.264 70.9055 111.586 70.3035 111.586ZM81.7406 113V106.238H79.9626V110.816C79.6546 111.208 79.1086 111.586 78.4226 111.586C77.6666 111.586 77.1766 111.278 77.1766 110.34V106.238H75.3986V111.04C75.3986 112.356 76.0986 113.168 77.5826 113.168C78.6886 113.168 79.5006 112.664 79.9626 112.146V113H81.7406ZM85.284 113V103.662H83.506V113H85.284ZM90.225 113.168C91.275 113.168 92.339 112.846 93.011 112.23L92.227 111.082C91.793 111.502 90.995 111.754 90.421 111.754C89.273 111.754 88.587 111.04 88.475 110.186H93.501V109.794C93.501 107.582 92.129 106.07 90.113 106.07C88.055 106.07 86.613 107.652 86.613 109.612C86.613 111.782 88.167 113.168 90.225 113.168ZM91.779 108.982H88.447C88.531 108.31 89.007 107.484 90.113 107.484C91.289 107.484 91.737 108.338 91.779 108.982ZM101.447 113.168C103.687 113.168 105.129 112.034 105.129 110.424C105.129 109.024 103.897 108.282 102.945 108.184C103.981 108.002 104.989 107.232 104.989 106.056C104.989 104.502 103.645 103.522 101.461 103.522C99.8234 103.522 98.6474 104.152 97.8914 105.006L98.8854 106.252C99.5434 105.622 100.355 105.286 101.251 105.286C102.231 105.286 102.987 105.65 102.987 106.392C102.987 107.078 102.301 107.386 101.265 107.386C100.915 107.386 100.271 107.386 100.103 107.372V109.164C100.243 109.15 100.873 109.136 101.265 109.136C102.567 109.136 103.141 109.472 103.141 110.214C103.141 110.914 102.511 111.404 101.377 111.404C100.467 111.404 99.4454 111.012 98.8014 110.34L97.7654 111.67C98.4514 112.51 99.7254 113.168 101.447 113.168Z" fill={colorMain1} />
      }
      {
        index === 4 && <path d="M57.2755 113V103.662H54.4755L52.2075 109.304L49.9395 103.662H47.1535V113H49.1415V106.462L51.7735 113H52.6415L55.2735 106.462V113H57.2755ZM62.2241 113.168C64.4641 113.168 65.8081 111.544 65.8081 109.612C65.8081 107.694 64.4641 106.07 62.2241 106.07C59.9981 106.07 58.6541 107.694 58.6541 109.612C58.6541 111.544 59.9981 113.168 62.2241 113.168ZM62.2241 111.586C61.1181 111.586 60.5021 110.676 60.5021 109.612C60.5021 108.562 61.1181 107.652 62.2241 107.652C63.3301 107.652 63.9601 108.562 63.9601 109.612C63.9601 110.676 63.3301 111.586 62.2241 111.586ZM73.5671 113V103.662H71.7751V107.106C71.2431 106.42 70.4871 106.07 69.6891 106.07C67.9671 106.07 66.6931 107.414 66.6931 109.626C66.6931 111.88 67.9811 113.168 69.6891 113.168C70.5011 113.168 71.2431 112.804 71.7751 112.132V113H73.5671ZM70.2351 111.586C69.2271 111.586 68.5271 110.788 68.5271 109.626C68.5271 108.45 69.2271 107.652 70.2351 107.652C70.8371 107.652 71.4811 107.974 71.7751 108.422V110.816C71.4811 111.264 70.8371 111.586 70.2351 111.586ZM81.6722 113V106.238H79.8942V110.816C79.5862 111.208 79.0402 111.586 78.3542 111.586C77.5982 111.586 77.1082 111.278 77.1082 110.34V106.238H75.3302V111.04C75.3302 112.356 76.0302 113.168 77.5142 113.168C78.6202 113.168 79.4322 112.664 79.8942 112.146V113H81.6722ZM85.2157 113V103.662H83.4377V113H85.2157ZM90.1567 113.168C91.2067 113.168 92.2707 112.846 92.9427 112.23L92.1587 111.082C91.7247 111.502 90.9267 111.754 90.3527 111.754C89.2047 111.754 88.5187 111.04 88.4067 110.186H93.4327V109.794C93.4327 107.582 92.0607 106.07 90.0447 106.07C87.9867 106.07 86.5447 107.652 86.5447 109.612C86.5447 111.782 88.0987 113.168 90.1567 113.168ZM91.7107 108.982H88.3787C88.4627 108.31 88.9387 107.484 90.0447 107.484C91.2207 107.484 91.6687 108.338 91.7107 108.982ZM104.221 113V111.068H105.425V109.318H104.221V103.662H101.477L97.767 109.5V111.068H102.233V113H104.221ZM102.233 109.318H99.713L102.233 105.426V109.318Z" fill={colorMain1} />
      }
      {
        index === 5 && <path d="M57.1935 113V103.662H54.3935L52.1255 109.304L49.8575 103.662H47.0715V113H49.0595V106.462L51.6915 113H52.5595L55.1915 106.462V113H57.1935ZM62.142 113.168C64.382 113.168 65.726 111.544 65.726 109.612C65.726 107.694 64.382 106.07 62.142 106.07C59.916 106.07 58.572 107.694 58.572 109.612C58.572 111.544 59.916 113.168 62.142 113.168ZM62.142 111.586C61.036 111.586 60.42 110.676 60.42 109.612C60.42 108.562 61.036 107.652 62.142 107.652C63.248 107.652 63.878 108.562 63.878 109.612C63.878 110.676 63.248 111.586 62.142 111.586ZM73.4851 113V103.662H71.6931V107.106C71.1611 106.42 70.4051 106.07 69.6071 106.07C67.8851 106.07 66.6111 107.414 66.6111 109.626C66.6111 111.88 67.8991 113.168 69.6071 113.168C70.4191 113.168 71.1611 112.804 71.6931 112.132V113H73.4851ZM70.1531 111.586C69.1451 111.586 68.4451 110.788 68.4451 109.626C68.4451 108.45 69.1451 107.652 70.1531 107.652C70.7551 107.652 71.3991 107.974 71.6931 108.422V110.816C71.3991 111.264 70.7551 111.586 70.1531 111.586ZM81.5902 113V106.238H79.8122V110.816C79.5042 111.208 78.9582 111.586 78.2722 111.586C77.5162 111.586 77.0262 111.278 77.0262 110.34V106.238H75.2482V111.04C75.2482 112.356 75.9482 113.168 77.4322 113.168C78.5382 113.168 79.3502 112.664 79.8122 112.146V113H81.5902ZM85.1336 113V103.662H83.3556V113H85.1336ZM90.0746 113.168C91.1246 113.168 92.1886 112.846 92.8606 112.23L92.0766 111.082C91.6426 111.502 90.8446 111.754 90.2706 111.754C89.1226 111.754 88.4366 111.04 88.3246 110.186H93.3506V109.794C93.3506 107.582 91.9786 106.07 89.9626 106.07C87.9046 106.07 86.4626 107.652 86.4626 109.612C86.4626 111.782 88.0166 113.168 90.0746 113.168ZM91.6286 108.982H88.2966C88.3806 108.31 88.8566 107.484 89.9626 107.484C91.1386 107.484 91.5866 108.338 91.6286 108.982ZM101.619 113.168C103.873 113.168 105.357 111.922 105.357 109.934C105.357 108.044 103.943 106.91 102.361 106.91C101.507 106.91 100.751 107.246 100.303 107.694V105.412H104.727V103.662H98.315V109.024L99.701 109.388C100.261 108.856 100.891 108.632 101.661 108.632C102.725 108.632 103.341 109.192 103.341 110.018C103.341 110.774 102.711 111.404 101.605 111.404C100.625 111.404 99.757 111.04 99.127 110.382L98.021 111.768C98.819 112.636 99.995 113.168 101.619 113.168Z" fill={colorMain1} />
      }
      {
        index === 6 && <path d="M57.1935 113V103.662H54.3935L52.1255 109.304L49.8575 103.662H47.0715V113H49.0595V106.462L51.6915 113H52.5595L55.1915 106.462V113H57.1935ZM62.142 113.168C64.382 113.168 65.726 111.544 65.726 109.612C65.726 107.694 64.382 106.07 62.142 106.07C59.916 106.07 58.572 107.694 58.572 109.612C58.572 111.544 59.916 113.168 62.142 113.168ZM62.142 111.586C61.036 111.586 60.42 110.676 60.42 109.612C60.42 108.562 61.036 107.652 62.142 107.652C63.248 107.652 63.878 108.562 63.878 109.612C63.878 110.676 63.248 111.586 62.142 111.586ZM73.4851 113V103.662H71.6931V107.106C71.1611 106.42 70.4051 106.07 69.6071 106.07C67.8851 106.07 66.6111 107.414 66.6111 109.626C66.6111 111.88 67.8991 113.168 69.6071 113.168C70.4191 113.168 71.1611 112.804 71.6931 112.132V113H73.4851ZM70.1531 111.586C69.1451 111.586 68.4451 110.788 68.4451 109.626C68.4451 108.45 69.1451 107.652 70.1531 107.652C70.7551 107.652 71.3991 107.974 71.6931 108.422V110.816C71.3991 111.264 70.7551 111.586 70.1531 111.586ZM81.5902 113V106.238H79.8122V110.816C79.5042 111.208 78.9582 111.586 78.2722 111.586C77.5162 111.586 77.0262 111.278 77.0262 110.34V106.238H75.2482V111.04C75.2482 112.356 75.9482 113.168 77.4322 113.168C78.5382 113.168 79.3502 112.664 79.8122 112.146V113H81.5902ZM85.1336 113V103.662H83.3556V113H85.1336ZM90.0746 113.168C91.1246 113.168 92.1886 112.846 92.8606 112.23L92.0766 111.082C91.6426 111.502 90.8446 111.754 90.2706 111.754C89.1226 111.754 88.4366 111.04 88.3246 110.186H93.3506V109.794C93.3506 107.582 91.9786 106.07 89.9626 106.07C87.9046 106.07 86.4626 107.652 86.4626 109.612C86.4626 111.782 88.0166 113.168 90.0746 113.168ZM91.6286 108.982H88.2966C88.3806 108.31 88.8566 107.484 89.9626 107.484C91.1386 107.484 91.5866 108.338 91.6286 108.982ZM101.843 113.168C103.971 113.168 105.413 111.782 105.413 109.962C105.413 107.974 103.915 106.924 102.235 106.924C101.213 106.924 100.275 107.498 99.841 108.128C99.827 108.058 99.827 108.002 99.827 107.932C99.827 106.448 100.793 105.286 102.165 105.286C102.991 105.286 103.523 105.538 104.027 106.014L104.923 104.488C104.251 103.914 103.299 103.522 102.165 103.522C99.407 103.522 97.811 105.524 97.811 108.352C97.811 110.984 99.001 113.168 101.843 113.168ZM101.731 111.404C100.429 111.404 99.925 110.41 99.841 109.514C100.289 108.954 100.961 108.632 101.661 108.632C102.557 108.632 103.397 109.052 103.397 110.032C103.397 110.69 102.809 111.404 101.731 111.404Z" fill={colorMain1} />
      }
      {
        index === 7 && <path d="M58.1378 113V103.662H55.3378L53.0698 109.304L50.8018 103.662H48.0158V113H50.0038V106.462L52.6358 113H53.5038L56.1358 106.462V113H58.1378ZM63.0864 113.168C65.3264 113.168 66.6704 111.544 66.6704 109.612C66.6704 107.694 65.3264 106.07 63.0864 106.07C60.8604 106.07 59.5164 107.694 59.5164 109.612C59.5164 111.544 60.8604 113.168 63.0864 113.168ZM63.0864 111.586C61.9804 111.586 61.3644 110.676 61.3644 109.612C61.3644 108.562 61.9804 107.652 63.0864 107.652C64.1924 107.652 64.8224 108.562 64.8224 109.612C64.8224 110.676 64.1924 111.586 63.0864 111.586ZM74.4294 113V103.662H72.6374V107.106C72.1054 106.42 71.3494 106.07 70.5514 106.07C68.8294 106.07 67.5554 107.414 67.5554 109.626C67.5554 111.88 68.8434 113.168 70.5514 113.168C71.3634 113.168 72.1054 112.804 72.6374 112.132V113H74.4294ZM71.0974 111.586C70.0894 111.586 69.3894 110.788 69.3894 109.626C69.3894 108.45 70.0894 107.652 71.0974 107.652C71.6994 107.652 72.3434 107.974 72.6374 108.422V110.816C72.3434 111.264 71.6994 111.586 71.0974 111.586ZM82.5345 113V106.238H80.7565V110.816C80.4485 111.208 79.9025 111.586 79.2165 111.586C78.4605 111.586 77.9705 111.278 77.9705 110.34V106.238H76.1925V111.04C76.1925 112.356 76.8925 113.168 78.3765 113.168C79.4825 113.168 80.2945 112.664 80.7565 112.146V113H82.5345ZM86.078 113V103.662H84.3V113H86.078ZM91.019 113.168C92.069 113.168 93.133 112.846 93.805 112.23L93.021 111.082C92.587 111.502 91.789 111.754 91.215 111.754C90.067 111.754 89.381 111.04 89.269 110.186H94.295V109.794C94.295 107.582 92.923 106.07 90.907 106.07C88.849 106.07 87.407 107.652 87.407 109.612C87.407 111.782 88.961 113.168 91.019 113.168ZM92.573 108.982H89.241C89.325 108.31 89.801 107.484 90.907 107.484C92.083 107.484 92.531 108.338 92.573 108.982ZM102.157 113L105.629 105.048V103.662H98.6153V105.412H103.319L99.9733 113H102.157Z" fill={colorMain1} />
      }
      {
        index === 8 && <path d="M57.2071 113V103.662H54.4071L52.1391 109.304L49.8711 103.662H47.0851V113H49.0731V106.462L51.7051 113H52.5731L55.2051 106.462V113H57.2071ZM62.1557 113.168C64.3957 113.168 65.7397 111.544 65.7397 109.612C65.7397 107.694 64.3957 106.07 62.1557 106.07C59.9297 106.07 58.5857 107.694 58.5857 109.612C58.5857 111.544 59.9297 113.168 62.1557 113.168ZM62.1557 111.586C61.0497 111.586 60.4337 110.676 60.4337 109.612C60.4337 108.562 61.0497 107.652 62.1557 107.652C63.2617 107.652 63.8917 108.562 63.8917 109.612C63.8917 110.676 63.2617 111.586 62.1557 111.586ZM73.4988 113V103.662H71.7068V107.106C71.1748 106.42 70.4188 106.07 69.6208 106.07C67.8988 106.07 66.6248 107.414 66.6248 109.626C66.6248 111.88 67.9128 113.168 69.6208 113.168C70.4328 113.168 71.1748 112.804 71.7068 112.132V113H73.4988ZM70.1668 111.586C69.1588 111.586 68.4588 110.788 68.4588 109.626C68.4588 108.45 69.1588 107.652 70.1668 107.652C70.7688 107.652 71.4128 107.974 71.7068 108.422V110.816C71.4128 111.264 70.7688 111.586 70.1668 111.586ZM81.6039 113V106.238H79.8259V110.816C79.5179 111.208 78.9719 111.586 78.2859 111.586C77.5299 111.586 77.0399 111.278 77.0399 110.34V106.238H75.2619V111.04C75.2619 112.356 75.9619 113.168 77.4459 113.168C78.5519 113.168 79.3639 112.664 79.8259 112.146V113H81.6039ZM85.1473 113V103.662H83.3693V113H85.1473ZM90.0883 113.168C91.1383 113.168 92.2023 112.846 92.8743 112.23L92.0903 111.082C91.6563 111.502 90.8583 111.754 90.2843 111.754C89.1363 111.754 88.4503 111.04 88.3383 110.186H93.3643V109.794C93.3643 107.582 91.9923 106.07 89.9763 106.07C87.9183 106.07 86.4763 107.652 86.4763 109.612C86.4763 111.782 88.0303 113.168 90.0883 113.168ZM91.6423 108.982H88.3103C88.3943 108.31 88.8703 107.484 89.9763 107.484C91.1523 107.484 91.6003 108.338 91.6423 108.982ZM101.591 113.168C103.551 113.168 105.343 112.314 105.343 110.578C105.343 109.444 104.447 108.576 103.327 108.184C104.363 107.82 105.189 107.148 105.189 105.986C105.189 104.236 103.313 103.522 101.591 103.522C99.8546 103.522 97.9926 104.236 97.9926 105.986C97.9926 107.148 98.8046 107.82 99.8406 108.184C98.7206 108.576 97.8386 109.444 97.8386 110.578C97.8386 112.328 99.6306 113.168 101.591 113.168ZM101.591 107.4C101.017 107.316 100.009 106.994 100.009 106.294C100.009 105.622 100.667 105.23 101.591 105.23C102.501 105.23 103.159 105.622 103.159 106.294C103.159 106.994 102.165 107.316 101.591 107.4ZM101.591 111.46C100.611 111.46 99.8546 111.012 99.8546 110.326C99.8546 109.542 101.003 109.164 101.591 109.08C102.165 109.164 103.327 109.542 103.327 110.326C103.327 111.012 102.543 111.46 101.591 111.46Z" fill={colorMain1} />
      }
      {
        index === 9 && <path d="M57.1935 113V103.662H54.3935L52.1255 109.304L49.8575 103.662H47.0715V113H49.0595V106.462L51.6915 113H52.5595L55.1915 106.462V113H57.1935ZM62.142 113.168C64.382 113.168 65.726 111.544 65.726 109.612C65.726 107.694 64.382 106.07 62.142 106.07C59.916 106.07 58.572 107.694 58.572 109.612C58.572 111.544 59.916 113.168 62.142 113.168ZM62.142 111.586C61.036 111.586 60.42 110.676 60.42 109.612C60.42 108.562 61.036 107.652 62.142 107.652C63.248 107.652 63.878 108.562 63.878 109.612C63.878 110.676 63.248 111.586 62.142 111.586ZM73.4851 113V103.662H71.6931V107.106C71.1611 106.42 70.4051 106.07 69.6071 106.07C67.8851 106.07 66.6111 107.414 66.6111 109.626C66.6111 111.88 67.8991 113.168 69.6071 113.168C70.4191 113.168 71.1611 112.804 71.6931 112.132V113H73.4851ZM70.1531 111.586C69.1451 111.586 68.4451 110.788 68.4451 109.626C68.4451 108.45 69.1451 107.652 70.1531 107.652C70.7551 107.652 71.3991 107.974 71.6931 108.422V110.816C71.3991 111.264 70.7551 111.586 70.1531 111.586ZM81.5902 113V106.238H79.8122V110.816C79.5042 111.208 78.9582 111.586 78.2722 111.586C77.5162 111.586 77.0262 111.278 77.0262 110.34V106.238H75.2482V111.04C75.2482 112.356 75.9482 113.168 77.4322 113.168C78.5382 113.168 79.3502 112.664 79.8122 112.146V113H81.5902ZM85.1336 113V103.662H83.3556V113H85.1336ZM90.0746 113.168C91.1246 113.168 92.1886 112.846 92.8606 112.23L92.0766 111.082C91.6426 111.502 90.8446 111.754 90.2706 111.754C89.1226 111.754 88.4366 111.04 88.3246 110.186H93.3506V109.794C93.3506 107.582 91.9786 106.07 89.9626 106.07C87.9046 106.07 86.4626 107.652 86.4626 109.612C86.4626 111.782 88.0166 113.168 90.0746 113.168ZM91.6286 108.982H88.2966C88.3806 108.31 88.8566 107.484 89.9626 107.484C91.1386 107.484 91.5866 108.338 91.6286 108.982ZM101.017 113.154C103.775 113.154 105.357 111.152 105.357 108.338C105.357 105.692 104.167 103.508 101.339 103.508C99.211 103.508 97.755 104.894 97.755 106.714C97.755 108.702 99.267 109.752 100.947 109.752C101.969 109.752 102.907 109.178 103.355 108.548C103.355 108.618 103.355 108.688 103.355 108.758C103.355 110.102 102.557 111.39 101.017 111.39C100.191 111.39 99.659 111.138 99.155 110.662L98.273 112.188C98.931 112.776 99.883 113.154 101.017 113.154ZM101.507 108.044C100.639 108.044 99.785 107.624 99.785 106.644C99.785 106 100.373 105.272 101.437 105.272C102.753 105.272 103.257 106.28 103.341 107.176C102.893 107.722 102.207 108.044 101.507 108.044Z" fill={colorMain1} />
      }
      {
        index === 10 && <path d="M54.2335 113V103.662H51.4335L49.1655 109.304L46.8975 103.662H44.1115V113H46.0995V106.462L48.7315 113H49.5995L52.2315 106.462V113H54.2335ZM59.1821 113.168C61.4221 113.168 62.7661 111.544 62.7661 109.612C62.7661 107.694 61.4221 106.07 59.1821 106.07C56.9561 106.07 55.6121 107.694 55.6121 109.612C55.6121 111.544 56.9561 113.168 59.1821 113.168ZM59.1821 111.586C58.0761 111.586 57.4601 110.676 57.4601 109.612C57.4601 108.562 58.0761 107.652 59.1821 107.652C60.2881 107.652 60.9181 108.562 60.9181 109.612C60.9181 110.676 60.2881 111.586 59.1821 111.586ZM70.5251 113V103.662H68.7331V107.106C68.2011 106.42 67.4451 106.07 66.6471 106.07C64.9251 106.07 63.6511 107.414 63.6511 109.626C63.6511 111.88 64.9391 113.168 66.6471 113.168C67.4591 113.168 68.2011 112.804 68.7331 112.132V113H70.5251ZM67.1931 111.586C66.1851 111.586 65.4851 110.788 65.4851 109.626C65.4851 108.45 66.1851 107.652 67.1931 107.652C67.7951 107.652 68.4391 107.974 68.7331 108.422V110.816C68.4391 111.264 67.7951 111.586 67.1931 111.586ZM78.6303 113V106.238H76.8523V110.816C76.5443 111.208 75.9983 111.586 75.3123 111.586C74.5563 111.586 74.0663 111.278 74.0663 110.34V106.238H72.2883V111.04C72.2883 112.356 72.9883 113.168 74.4723 113.168C75.5783 113.168 76.3903 112.664 76.8523 112.146V113H78.6303ZM82.1737 113V103.662H80.3957V113H82.1737ZM87.1147 113.168C88.1647 113.168 89.2287 112.846 89.9007 112.23L89.1167 111.082C88.6827 111.502 87.8847 111.754 87.3107 111.754C86.1627 111.754 85.4767 111.04 85.3647 110.186H90.3907V109.794C90.3907 107.582 89.0187 106.07 87.0027 106.07C84.9447 106.07 83.5027 107.652 83.5027 109.612C83.5027 111.782 85.0567 113.168 87.1147 113.168ZM88.6687 108.982H85.3367C85.4207 108.31 85.8967 107.484 87.0027 107.484C88.1787 107.484 88.6267 108.338 88.6687 108.982ZM99.205 113V103.662H97.469L94.529 106.616L95.663 107.806L97.217 106.224V113H99.205ZM104.471 113.168C107.131 113.168 108.335 110.746 108.335 108.338C108.335 105.93 107.131 103.522 104.471 103.522C101.797 103.522 100.607 105.93 100.607 108.338C100.607 110.746 101.797 113.168 104.471 113.168ZM104.471 111.404C103.127 111.404 102.623 110.06 102.623 108.338C102.623 106.616 103.127 105.286 104.471 105.286C105.801 105.286 106.305 106.616 106.305 108.338C106.305 110.06 105.801 111.404 104.471 111.404Z" fill={colorMain1} />
      }

    </svg>;
};

export default BBadge;