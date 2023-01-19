
import { styled, Box, Typography } from '@mui/material';

const Image = styled(Box)`
    width: 100%;
    background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x #000;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Heading = styled(Typography)`
    font-size: 70px;
    font-weight:900;
    color: #FFFFFF;
    line-height: 1,
    text-shadow: -1px 1px 0 #000,
                          1px 1px 0 #000,
                         1px -1px 0 #000,
                        -1px -1px 0 #000;
    
`;


const SubHeading = styled(Typography)`
    font-size: 20px;
    background: #FFFFFF;
`;

const SubSubHeading = styled(Typography)`
    font-size: 13px;
    color: #FFFFFF;
`;

const Banner = () => {
    
    return (
        <Image>
            <Heading>CODER'S<span style={{color:'#FFF300'}}> BLOG</span></Heading>
            <SubHeading>&nbsp;A perfect place to all new tips and tricks.&nbsp;</SubHeading>
            <SubSubHeading>by Anup Kumar Dutta</SubSubHeading>
        </Image>
    )
}

export default Banner;