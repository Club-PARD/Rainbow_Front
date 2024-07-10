import styled from 'styled-components';
import {useRecoilState} from 'recoil';
import { PostCount } from '../Atom';
import flowerImage from "../Assets/Img/flower.svg";

function FlowerCount () {
    const [postCount, setPostCount] = useRecoilState(PostCount);
    
    return (
    <FlowerCountWrapper>
        <img src={flowerImage} alt="flower" />
        <FlowerText>지금까지 심은 꽃 개수 : {postCount}/40</FlowerText>
    </FlowerCountWrapper>
    );
};

const FlowerCountWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
    width: 362px;
    padding: 8px 16px;
    margin-bottom: 91px;
    margin-top: 261px;
    border-radius: 8px;
    border: 1px solid #C6C6C6;
    background: var(--grayscale-White, #FEFEFE);
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.15);
`

const FlowerText = styled.div`
    color: #9B9B9B;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
`

export default FlowerCount;
