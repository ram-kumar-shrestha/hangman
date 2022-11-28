import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FormGroup, FormLayout, Info } from "../../components";
import { AddOwnerValidate } from "../../helpers";
import { getSingleOwner, editOwner } from "../../store/action";

const add_owner = (
  <svg
    data-name="Layer 1"
    viewBox="0 0 810.57201 710.713"
    height="100%"
    width="100%"
    version="1.1"
    id="svg40"
  >
    <defs id="defs44" />

    <path
      id="fbc32b64-bbdf-4dbc-bb60-a52584491975-714"
      data-name="Path 339"
      d="m 810.572,168.89198 h -3.9 V 61.915 A 61.915,61.915 0 0 0 744.757,0 h -226.65 a 61.915,61.915 0 0 0 -61.916,61.914 v 586.884 a 61.915,61.915 0 0 0 61.915,61.915 h 226.648 a 61.915,61.915 0 0 0 61.915,-61.915 V 245.04 h 3.9 z"
      fill="#3f3d56"
    />
    <path
      id="bb5c9466-73f2-44a0-9556-78839eb5ebb8-715"
      data-name="Path 340"
      d="m 794.045,57.768 v 595.175 a 46.959,46.959 0 0 1 -46.942,46.952 h -231.3 A 46.966,46.966 0 0 1 468.83,652.943 V 57.768 a 46.965,46.965 0 0 1 46.971,-46.951 h 28.058 a 22.329,22.329 0 0 0 20.656,30.74 h 131.868 a 22.329,22.329 0 0 0 20.656,-30.74 h 30.055 a 46.959,46.959 0 0 1 46.951,46.942 z"
      fill="#ffffff"
    />
    <path
      id="a4c0f7b0-a249-48db-8324-425c4b242004-716"
      data-name="Path 45"
      d="m 633.918,295.87499 a 99.3,99.3 0 0 1 -99.337,-99.254 v -0.088 c 0,-0.208 0,-0.427 0.012,-0.635 0.3,-54.4 44.863,-98.7 99.325,-98.7 a 99.337,99.337 0 0 1 0.011,198.674 h -0.011 z m 0,-196.587 a 97.454,97.454 0 0 0 -97.233,96.677 c -0.011,0.222 -0.011,0.4 -0.011,0.569 a 97.258,97.258 0 1 0 97.27,-97.246 z"
      fill="#e6e6e6"
    />
    <path
      id="b3f05bc2-81da-406b-86dd-2b0d92091530-717"
      data-name="Path 39"
      d="M 736.639,400.31599 H 531.102 a 3.81,3.81 0 0 1 -3.806,-3.806 v -50.98398 a 3.811,3.811 0 0 1 3.806,-3.806 h 205.537 a 3.811,3.811 0 0 1 3.806,3.806 v 50.985 a 3.811,3.811 0 0 1 -3.806,3.806 z m -205.537,-57.074 a 2.286,2.286 0 0 0 -2.284,2.284 v 50.985 a 2.286,2.286 0 0 0 2.284,2.284 h 205.537 a 2.286,2.286 0 0 0 2.284,-2.284 v -50.985 a 2.286,2.286 0 0 0 -2.284,-2.284 z"
      fill="#e6e6e6"
    />
    <path
      id="b21e6212-c1f0-403c-bdef-232e508e770f-718"
      data-name="Path 40"
      d="m 594.666,360.36099 a 2.6645,2.6645 0 0 0 0,5.329 h 125.605 a 2.6650096,2.6650096 0 0 0 0.2041,-5.32611 q -0.0585,-0.002 -0.11712,-0.002 H 594.666 Z"
      fill="#e6e6e6"
    />
    <path
      id="ab780905-ae65-4edb-8494-502e8ec549f1-719"
      data-name="Path 41"
      d="m 594.666,376.34697 a 2.6645,2.6645 0 0 0 0,5.329 h 125.605 a 2.6650096,2.6650096 0 0 0 0.2041,-5.32611 q -0.0585,-0.002 -0.11712,-0.002 H 594.666 Z"
      fill="#e6e6e6"
    />
    <path
      id="bcf324bf-85a9-4a34-8465-70a8e4155def-720"
      data-name="Path 42"
      d="M 736.639,485.57598 H 531.102 a 3.81,3.81 0 0 1 -3.806,-3.806 v -50.984 a 3.811,3.811 0 0 1 3.806,-3.806 h 205.537 a 3.811,3.811 0 0 1 3.806,3.806 v 50.985 a 3.811,3.811 0 0 1 -3.806,3.805 z m -205.537,-57.074 a 2.286,2.286 0 0 0 -2.284,2.284 v 50.985 a 2.286,2.286 0 0 0 2.284,2.284 h 205.537 a 2.286,2.286 0 0 0 2.284,-2.284 v -50.985 a 2.286,2.286 0 0 0 -2.284,-2.284 z"
      fill="#e6e6e6"
    />
    <path
      id="fd1e492a-db21-4dcb-b43f-b24103837e5e-721"
      data-name="Path 43"
      d="m 594.666,445.61699 a 2.6645,2.6645 0 0 0 0,5.329 h 125.605 a 2.665,2.665 0 0 0 0.087,-5.328 H 594.666 Z"
      fill="#e6e6e6"
    />
    <path
      id="e10d4cc9-8111-46ce-a7fa-ade6cf037e94-722"
      data-name="Path 44"
      d="m 594.666,461.60703 a 2.6645,2.6645 0 0 0 0,5.329 h 125.605 a 2.665,2.665 0 0 0 0.087,-5.328 H 594.666 Z"
      fill="#e6e6e6"
    />
    <path
      id="e6fa78bf-0588-4ac5-badf-0fd5526a4b08-723"
      data-name="Path 39-2"
      d="M 736.639,570.83399 H 531.102 a 3.81,3.81 0 0 1 -3.806,-3.806 v -50.984 a 3.811,3.811 0 0 1 3.806,-3.806 h 205.537 a 3.811,3.811 0 0 1 3.806,3.806 v 50.985 a 3.811,3.811 0 0 1 -3.806,3.806 z m -205.537,-57.074 a 2.286,2.286 0 0 0 -2.284,2.284 v 50.985 a 2.286,2.286 0 0 0 2.284,2.284 h 205.537 a 2.286,2.286 0 0 0 2.284,-2.284 v -50.985 a 2.286,2.286 0 0 0 -2.284,-2.284 z"
      fill="#e6e6e6"
    />
    <path
      id="a87641aa-c143-4ef5-a11b-e1a417496101-724"
      data-name="Path 40-2"
      d="m 594.666,530.87798 a 2.6645,2.6645 0 0 0 0,5.329 h 125.605 a 2.6650096,2.6650096 0 0 0 0.2041,-5.32611 q -0.0585,-0.002 -0.11712,-0.002 H 594.666 Z"
      fill="#e6e6e6"
    />
    <path
      id="a07223e8-f594-430f-b9d3-e015b3831fec-725"
      data-name="Path 41-2"
      d="m 594.666,546.86497 a 2.6645,2.6645 0 0 0 0,5.329 h 125.605 a 2.6650096,2.6650096 0 0 0 0.2041,-5.32611 q -0.0585,-0.002 -0.11712,-0.002 H 594.666 Z"
      fill="#e6e6e6"
    />
    <path
      id="e005e6fa-4f2e-4ca5-bbad-52a51b7cf8f1-726"
      data-name="Path 1221"
      d="m 665.307,194.12301 h -28.97 v -28.971 h -4.829 v 28.971 h -28.97 v 4.828 h 28.97 v 28.971 h 4.829 v -28.971 h 28.97 z"
      fill="#6c63ff"
      style={{ fill: "#478498", fillOpacity: "1" }}
    />
    <g id="f8897680-c254-4e03-b64e-cafda03b28cd" data-name="Group 76">
      <path
        id="a4b49412-a00b-41e8-9df5-5be91e0af45a-727"
        data-name="Path 1236"
        d="m 415.138,653.07848 c 0,0 -23.688,25.944 -27.072,85.727 -3.384,59.783 -4.512,66.551 -4.512,66.551 h 84.6 l 15.784,-40.603 18.052,40.6 h 80.087 c 0,0 9.024,-124.079 0,-127.463 -9.024,-3.384 -166.939,-24.812 -166.939,-24.812 z"
        transform="translate(-194.714,-94.6435)"
        fill="#2f2e41"
      />
      <circle
        id="a51505d3-b438-42e2-99d6-990457d95d5b"
        data-name="Ellipse 232"
        cx="333.784"
        cy="212.70599"
        r="40.606998"
        fill="#ffb8b8"
      />
      <path
        id="ec92e0b2-d4cb-42ed-ba19-b2a2a41a81da-728"
        data-name="Path 1238"
        d="m 703.901,654.21054 -62.039,-112.8 -36.1,-58.655 42.867,-19.17705 23.688,46.248 c 0,0 31.584,46.247 39.479,84.6 7.895,38.353 15.792,56.4 15.792,56.4 z"
        transform="translate(-194.714,-94.6435)"
        fill="#ffb8b8"
      />
      <path
        id="a52caa4b-6a44-4841-9266-9cf72e124768-729"
        data-name="Path 1239"
        d="m 362.115,621.49449 92.495,-81.215 -4.507,-65.424 h -25.944 l -7.9,33.84 -74.447,98.135 z"
        transform="translate(-194.714,-94.6435)"
        fill="#ffb8b8"
      />
      <path
        id="e22ec3f3-58f4-4cea-9212-087bc1079083-730"
        data-name="Path 1240"
        d="m 481.686,367.69949 c 0,0 33.5,14.044 58.484,-3.13 0,0 61.082,9.9 64.466,13.282 3.384,3.382 -3.384,104.9 -3.384,104.9 l -13.534,57.53 c 0,0 19.176,87.983 -9.024,110.543 l 5.64,30.456 c 0,0 -125.206,9.024 -174.838,-21.432 l 9.022,-30.45795 23.688,-95.879 -14.664,-133.1 c 0,0 11.276,-30.45604 54.144,-32.71205 z"
        transform="translate(-194.714,-94.6435)"
        fill="#e4e4e4"
      />
      <path
        id="aa85c0f3-d286-4cf0-8f31-f3dff29d3dd6-731"
        data-name="Path 1241"
        d="m 575.873,382.92549 29.328,-4.508 c 0,0 14.664,2.256 28.2,30.456 13.536,28.2 28.2,65.423 28.2,65.423 l -50.759,22.56 -41.735,-65.423 z"
        transform="translate(-194.714,-94.6435)"
        fill="#e4e4e4"
      />
      <path
        id="ad0ad546-ac25-4851-b25e-0217cff5ddae-732"
        data-name="Path 1242"
        d="m 434.312,394.7705 -6.768,5.64 c 0,0 -9.024,32.712 -9.024,55.271 v 30.456 l 40.608,4.512 z"
        transform="translate(-194.714,-94.6435)"
        fill="#e4e4e4"
      />
      <path
        id="bca4ff40-2aaf-4255-a760-4285173e03c8-733"
        data-name="Path 1243"
        d="m 487.902,318.37051 c 0,0 -5.52,-5.961 -4.961,-13.423 a 42.54637,42.54637 0 0 0 -0.805,-12.685 c 0,0 1.728,-12.213 4.279,-19.293 2.551,-7.08 0.4,-9.543 11.366,-13.408 10.966,-3.865 3.985,-17.841 36.314,-6.7 a 8.844,8.844 0 0 0 9.619,1.968 c 5.969,-2.186 9.566,6.014 9.566,6.014 0,0 3.723,-3.055 5.812,0.121 2.089,3.176 12.193,-4.062 15.9,19.041 3.707,23.103 -9.014,43.706 -9.014,43.706 0,0 -1.785,-36.97 -22.781,-37.641 -20.996,-0.671 -44.74,-8.623 -47.685,6.945 -2.945,15.568 -7.61,25.355 -7.61,25.355 z"
        transform="translate(-194.714,-94.6435)"
        fill="#2f2e41"
      />
      <circle
        cx="152.6049"
        cy="526.62787"
        r="17.5"
        fill="#ffb8b8"
        id="circle23"
      />
    </g>
    <path
      id="b2a9f943-63e7-459e-aa16-a074d5f617d3-734"
      data-name="Path 1259"
      d="m 26.445,644.82402 288.216,-57.532 -24.086,-120.66 -288.216,57.529 z"
      fill="#ffffff"
    />
    <path
      id="ebdb1a1e-e7bd-4f26-86a1-c9c47a08bbef-735"
      data-name="Path 1260"
      d="m 317.02,588.86801 -292.148,58.32 -24.872,-124.6 292.148,-58.317 z m -289,53.6 284.284,-56.747 -23.303,-116.733 -284.283,56.749 z"
      fill="#e4e4e4"
    />
    <g id="aef3f6ba-7c59-4e40-b9a2-55c1c94d044e" data-name="Group 77">
      <path
        id="bad16fdd-f75b-451f-b285-d445a7208cf1-736"
        data-name="Path 1230"
        d="m 315.13249,701.1157 -0.11825,0.0497 c -0.93994,0.387 -1.89247,0.75314 -2.87108,1.0737 -0.32888,0.11187 -0.66985,0.215 -1.00024,0.31493 -0.33039,0.0999 -0.67193,0.20523 -1.014,0.29844 -0.55675,0.16034 -1.12669,0.30195 -1.69966,0.434 -0.24534,0.0624 -0.50354,0.11733 -0.751,0.16995 l -0.14867,0.0316 c -0.30708,0.0653 -0.61417,0.13062 -0.92334,0.18614 l -0.79941,0.13932 c -0.14866,0.0316 -0.29549,0.0526 -0.44035,0.0732 a 42.55765,42.55765 0 1 1 6.61167,-82.4992 42.55568,42.55568 0 0 0 15.32,72.03361 42.3631,42.3631 0 0 1 -12.163,7.698 z"
        transform="translate(-194.714,-94.6435)"
        fill="#6c63ff"
        style={{ fill: "#478498", fillOpacity: "1" }}
      />
      <path
        id="f6393030-236e-4765-896b-209019e80fa8-737"
        data-name="Path 1231"
        d="m 375.9749,679.47143 a 41.56742,41.56742 0 0 0 5.76608,2.36785 42.33313,42.33313 0 0 1 -19.61973,10.03628 l -0.535,0.11378 a 42.55865,42.55865 0 1 1 4.83488,-82.18264 42.47666,42.47666 0 0 0 9.55375,69.66479 z"
        transform="translate(-194.714,-94.6435)"
        fill="#6c63ff"
        style={{ fill: "#478498", fillOpacity: "1" }}
      />
      <path
        id="eef8a7e5-3026-4df7-9c38-b31908ca0085-738"
        data-name="Path 1232"
        d="M 449.32615,629.8235 A 42.55764,42.55764 0 1 1 398.84642,597.05 v 0 a 42.55761,42.55761 0 0 1 50.47973,32.7735 z"
        transform="translate(-194.714,-94.6435)"
        fill="#6c63ff"
        style={{ fill: "#478498", fillOpacity: "1" }}
      />
      <path
        id="a3469722-1f94-4c8c-8be2-4ca7447cd0bf-739"
        data-name="Path 1233"
        d="m 431.50446,667.79948 a 28.5147,28.5147 0 0 1 0.62781,5.73005 42.63867,42.63867 0 0 1 -32.56739,6.9264 28.51912,28.51912 0 0 1 -1.75838,-5.4896 c -2.0825,-9.79176 1.14521,-19.12838 7.423,-23.35235 a 13.17235,13.17235 0 1 1 9.99026,-2.12472 c 7.45624,1.30303 14.20224,8.51846 16.2847,18.31022 z"
        transform="translate(-194.714,-94.6435)"
        fill="#ffffff"
      />
      <path
        id="bc06a3a3-a2a4-4ca1-a154-0afe6fce79b8-740"
        data-name="Path 1234"
        d="m 375.97551,679.47434 0.0275,0.12911 a 43.49583,43.49583 0 0 1 0.48483,7.14864 c -4.4085,3.09244 -9.336,3.98505 -14.90071,5.24111 l -0.535,0.11378 a 42.38821,42.38821 0 0 1 -16.98777,0.15266 4.41187,4.41187 0 0 1 -0.19862,-0.49646 27.27843,27.27843 0 0 1 -1.55877,-4.9933 c -2.0825,-9.79176 1.14522,-19.12837 7.423,-23.35234 a 13.17034,13.17034 0 0 1 -0.27088,-25.82033 12.71988,12.71988 0 0 1 3.06958,-0.27973 42.51059,42.51059 0 0 0 23.44828,42.15862 z"
        transform="translate(-194.714,-94.6435)"
        fill="#ffffff"
      />
      <path
        id="a7dd16b0-14ed-45f5-915f-9409366d1879-741"
        data-name="Path 1235"
        d="m 322.58544,691.56426 a 27.32873,27.32873 0 0 1 0.526,5.15062 42.4064,42.4064 0 0 1 -10.96656,5.52273 c -0.3291,0.11085 -0.66985,0.215 -1.00024,0.31492 -0.33039,0.0999 -0.67193,0.20524 -1.01395,0.29845 -0.55676,0.16033 -1.1267,0.30195 -1.69966,0.434 -0.11725,0.0352 -0.24535,0.0624 -0.36467,0.0878 l -0.535,0.11377 c -0.30708,0.0653 -0.61417,0.13063 -0.92334,0.18615 l -0.79941,0.13932 c -0.14866,0.0316 -0.29547,0.0526 -0.44036,0.0732 a 42.18129,42.18129 0 0 1 -14.82447,-0.245 0.17178,0.17178 0 0 1 -0.0245,-0.0673 3.29885,3.29885 0 0 1 -0.17406,-0.42912 27.27355,27.27355 0 0 1 -1.55877,-4.9933 c -2.0825,-9.79176 1.14521,-19.12837 7.423,-23.35234 a 13.17034,13.17034 0 0 1 -0.27088,-25.82033 12.89652,12.89652 0 0 1 2.1689,-0.27523 42.51268,42.51268 0 0 0 24.47872,42.86051 z"
        transform="translate(-194.714,-94.6435)"
        fill="#ffffff"
      />
    </g>
    <path
      id="a14dec19-2029-44b7-a69f-3af98ff2b6b9-742"
      data-name="Path 1265"
      d="m 566.359,378.66603 a 14.25841,14.25841 0 0 1 -0.289,2.868 21.32175,21.32175 0 0 1 -16.65,0 14.26348,14.26348 0 0 1 -0.289,-2.868 c 0,-5.006 2.549,-9.237 6.06,-10.651 a 6.587,6.587 0 1 1 5.107,0 c 3.512,1.414 6.061,5.64496 6.061,10.651 z"
      fill="#6c63ff"
      style={{ fill: "#478498", fillOpacity: "1" }}
    />
    <path
      id="f5db75fe-f3f0-4b0d-a92f-db6cf5b46fdd-743"
      data-name="Path 1266"
      d="m 566.359,465.65302 a 14.25858,14.25858 0 0 1 -0.289,2.868 21.32175,21.32175 0 0 1 -16.65,0 14.26365,14.26365 0 0 1 -0.289,-2.868 c 0,-5.006 2.549,-9.237 6.06,-10.651 a 6.587,6.587 0 1 1 5.107,0 c 3.512,1.41401 6.061,5.64496 6.061,10.651 z"
      fill="#6c63ff"
      style={{ fill: "#478498", fillOpacity: "1" }}
    />
    <path
      id="b494f491-cece-4ab7-a8b0-06febc19dd5d-744"
      data-name="Path 1267"
      d="m 566.359,550.91002 a 14.25858,14.25858 0 0 1 -0.289,2.868 21.32175,21.32175 0 0 1 -16.65,0 14.26365,14.26365 0 0 1 -0.289,-2.868 c 0,-5.006 2.549,-9.237 6.06,-10.651 a 6.587,6.587 0 1 1 5.107,0 c 3.512,1.414 6.061,5.64496 6.061,10.651 z"
      fill="#6c63ff"
      style={{ fill: "#478498", fillOpacity: "1" }}
    />
    <circle cx="522.10492" cy="564.12787" r="16" fill="#ffb8b8" id="circle38" />
  </svg>
);

const EditOwner = ({ owner, getSingleOwner, editOwner }) => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [thumb, setThumb] = useState(null);
  const [isThumb, setIsThumb] = useState(false);
  const [backButton, setBackButton] = useState("");

  useEffect(() => {
    document.title = "Syanko Katti Roll -Edit Owner";

    getSingleOwner(id).then(() => {});
  }, [id, owner.length]);

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let image = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setThumb(event.target.result);
      };
      reader.readAsDataURL(image);
    }
    setIsThumb(true);
  };

  const formik = useFormik({
    initialValues: {
      Name: owner.name ? owner.name : "",
      MobileNo: owner.mobileNo ? owner.mobileNo : "",
      Address: owner.address ? owner.address : "",
      IsActive: owner.isActive ? owner.isActive : false,
      Image: owner.ownerPhoto ? owner.ownerPhoto : null,
    },
    enableReinitialize: true,
    validate: AddOwnerValidate,
    onSubmit: (values) => {
      editOwner(id, { OwnerDetailId: `${id}`, ...values })
        .then(() => {
          setBackButton(
            <Link
              to="../view-all-owners"
              className="btn btn-outline-info w-45 mt-2"
            >
              View All Users
            </Link>
          );

          setMessage({
            desc: "Owner edited successfully.",
            type: "success",
          });
        })
        .catch((e) => {
          setMessage({
            desc: "Something went wrong.",
            type: "danger",
          });
          console.log(e);
        });
    },
  });
  return (
    <>
      <FormLayout
        formik={formik}
        title="Edit Owner"
        svg={add_owner}
        type="edit"
      >
        {/* owner edit message */}
        <Info info={message} />

        {/* View All Items */}
        {backButton}

        <FormGroup
          inputMethod="input"
          id="Name"
          label="Name:"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Name}
          error={formik.errors.Name}
          touched={formik.touched.Name}
        />
        <FormGroup
          inputMethod="input"
          id="MobileNo"
          label="Contact:"
          type="tel"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.MobileNo}
          error={formik.errors.MobileNo}
          touched={formik.touched.MobileNo}
        />
        <FormGroup
          inputMethod="input"
          id="Address"
          label="Address:"
          type="Address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Address}
          error={formik.errors.Address}
          touched={formik.touched.Address}
        />
        {/* <FormGroup
          inputMethod="input"
          styleProp="w-10"
          id="IsActive"
          label="Active:"
          type="checkbox"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.IsActive}
          error={formik.errors.IsActive}
          touched={formik.touched.IsActive}
        /> */}
        {/* <input
          id="file"
          name="Image"
          type="file"
          onChange={event => {
            formik.setFieldValue('Image', event.target.files[0])
            showPreview(event)
          }}
          className="form-control"
        />
        {isThumb && <img src={thumb} width="100" alt="owner photo" />} */}
      </FormLayout>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    owner: state.owner,
  };
};

export default connect(mapStateToProps, { getSingleOwner, editOwner })(
  EditOwner
);
