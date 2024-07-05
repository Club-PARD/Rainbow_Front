import React from 'react';
import { useLocation } from 'react-router-dom';
import AWS from "aws-sdk";  // AWS SDK를 가져옵니다.
import { useState, useRef } from "react";  // React의 useState와 useRef 훅을 가져옵니다.
import styled from "styled-components";  // styled-components 라이브러리를 가져옵니다.

function WritingPage() {
  const location = useLocation();
  const { selectedQuestion } = location.state || {};

  //여기서부터 동운 코드
  const [imageSrc, setImageSrc] = useState(null);  // 이미지 소스를 상태로 관리합니다.
    const [imageFile, setImageFile] = useState(null);  // 이미지 파일을 상태로 관리합니다.
    const inputRef = useRef([]);  // 파일 입력 요소를 참조하기 위한 ref를 생성합니다.

    const onUpload = (e) => {  // 파일 업로드 이벤트 핸들러를 정의합니다.
        const file = e.target.files[0];  // 업로드된 파일을 가져옵니다.
        if (!file) {
            setImageSrc(null);
            setImageFile(null);
            return;    
        }
        const fileExt = file.name.split('.').pop();  // 파일의 확장자를 추출합니다.

        // 확장자 제한
        if (!['jpeg', 'png', 'jpg', 'JPG', 'PNG', 'JPEG'].includes(fileExt)) {  // 허용된 확장자가 아니면
            alert('jpg, png, jpg 파일만 업로드가 가능합니다.');  // 경고 메시지를 표시합니다.
            return;  // 함수 실행을 중단합니다.
        }

        // 파일 Reader
        const reader = new FileReader();  // 파일을 읽기 위한 FileReader 객체를 생성합니다.
        reader.readAsDataURL(file);  // 파일을 Data URL로 읽습니다.

        // 파일 업로드
        reader.onload = () => {  // 파일 읽기가 완료되면
            // 이미지 경로 선언
            setImageSrc(reader.result || null);  // 이미지 소스를 상태로 설정합니다.
            // 이미지 파일 선언
            setImageFile(file);  // 이미지 파일을 상태로 설정합니다.
        };
    }

    const uploadS3 = (formData) => {  // S3에 파일을 업로드하는 함수입니다.
        const REGION = process.env.REACT_APP_REGION;  // 환경 변수에서 AWS 리전을 가져옵니다.
        const ACCESS_KEY_ID = process.env.REACT_APP_ACCESS_KEY_ID;  // 환경 변수에서 AWS 접근 키 ID를 가져옵니다.
        const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY_ID;  // 환경 변수에서 AWS 비밀 접근 키를 가져옵니다.

        AWS.config.update({  // AWS 설정을 업데이트합니다.
            region: REGION,  // 리전을 설정합니다.
            accessKeyId: ACCESS_KEY_ID,  // 접근 키 ID를 설정합니다.
            secretAccessKey: SECRET_ACCESS_KEY,  // 비밀 접근 키를 설정합니다.
        });

        const upload = new AWS.S3.ManagedUpload({  // S3 업로드 객체를 생성합니다.
            params: {  // 업로드 파라미터를 설정합니다.
                ACL: 'public-read',  // 공개 읽기 권한을 설정합니다.
                Bucket: '버킷명',  // 업로드할 S3 버킷을 설정합니다.
                Key: `upload/${imageFile.name}`,  // 업로드할 파일의 경로를 설정합니다.
                Body: imageFile,  // 업로드할 파일을 설정합니다.
            }
        });

        upload.promise()  // 업로드를 실행합니다.
            .then(() => {  // 업로드가 성공하면
                console.log('업로드');  // 성공 메시지를 콘솔에 출력합니다.
            })
            .catch((err) => {  // 업로드가 실패하면
                console.error('업로드 실패', err);  // 오류 메시지를 콘솔에 출력합니다.
            });
    };

  return (
    <Container>
        <div>
            <h1>Writing Page</h1>
            {selectedQuestion ? (
                <p>선택된 질문: {selectedQuestion}</p>
            ) : (
                <p>질문이 선택되지 않았습니다.</p>
            )}
        </div>
        
        {/* 여기서부터 동운 코드 */}
        <Img
            src={imageSrc}  // 이미지 소스를 설정합니다.
            alt="Img"  // 이미지 대체 텍스트를 설정합니다.
        />
        <input 
            accept="image/*"  // 모든 이미지 파일을 허용합니다.
            multiple  // 여러 파일을 선택할 수 있도록 합니다.
            type="file"  // 파일 입력 요소를 생성합니다.
            ref={el => (inputRef.current[0] = el)}  // ref를 설정합니다.
            onChange={e => onUpload(e)}  // 파일이 변경되면 onUpload 함수를 호출합니다.
        />
        {/* 여기는 유민 코드 */}
        <Textarea placeholder="사진과 글을 올릴 수 있습니다."></Textarea>
        <button 
            type="button"  // 버튼 타입을 설정합니다.
            onClick={() => {  // 버튼 클릭 이벤트 핸들러를 설정합니다.
                if (!imageSrc) {  // 이미지가 설정되지 않았으면
                    alert('이미지를 등록해 주세요.');  // 경고 메시지를 표시합니다.
                    return;  // 함수 실행을 중단합니다.
                }

                const formData = new FormData();  // 폼 데이터를 생성합니다.
                formData.append('file', imageFile);  // 이미지 파일을 폼 데이터에 추가합니다.
                formData.append('name', imageFile.name);  // 파일 이름을 폼 데이터에 추가합니다.

                uploadS3(formData);  // S3에 파일을 업로드합니다.
            }}
        >
            업로드!
        </button>
    </Container>
  );
}

export default WritingPage;

const Container = styled.div`
width: 100vw;  // 컨테이너 너비를 100vw로 설정합니다.
height: 100vh;  // 컨테이너 높이를 100vh로 설정합니다.
display: flex;  // Flexbox를 사용합니다.
flex-direction: column;  // Flexbox 방향을 세로로 설정합니다.
justify-content: center;  // Flexbox 내부 요소를 중앙에 정렬합니다.
align-items: center;  // Flexbox 내부 요소를 가로로 중앙에 정렬합니다.
`

const Img = styled.img`
width: 300px;  // 이미지 너비를 300px로 설정합니다.
`

const Textarea = styled.textarea`
width: 574px;
height: 244px;
font-size: 16px;
color: #B0B0B0;
background-color: #FEFEFE;
border: soild 0.8px #DDD;
border-radius: 8px;
padding: 12px 16px;
margin: 8px;
&:focus {
    outline: #B0B0B0;
}
`
