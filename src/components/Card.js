import React, { useState, useLayoutEffect } from "react";
import styled, { useTheme } from "styled-components";
import Cat from "../assets/images/cat.svg";

const Card = (props) => {
   // console.log(props.flavor, props.selected);
   const [cardState, setCardState] = useState();
   const [hover, setHover] = useState(false);
   const {brand, flavor, portions, weight, gift, description, quantity, toggle, selected} = props;

   const theme = useTheme();

   let specification = "";
   let cardColor = {default: "", hover: ""};
   let present = "мышь в подарок";

console.log("hover" ,hover);
   useLayoutEffect(() => {
      console.log(selected);
      if(quantity == 0) {
         setCardState("disabled")
       } else {
         selected ? setCardState("selected") : setCardState("");
       }
   },[selected])
   
   if(gift == 2){
      present = <><b>2</b> мыши в подарок</>;
   } else if ( gift > 2){
      present = <><b>{gift}</b> мышей в подарок</>;
   }

   switch (cardState) {
      case "selected":
         specification = description;
         cardColor= {default: theme.colors.selectedColor, hover: theme.colors.selectedHoverColor};
         break;
      case "disabled":
         specification = `Печалька, ${flavor} закончился.`
         cardColor= {default: theme.colors.disabledColor, hover: theme.colors.disabledColor};
         break;
      default:
         specification = <>Чего сидишь? Порадуй котэ, <span onClick={toggle}>купи.</span></>
         cardColor= {default: theme.colors.defaultColor, hover: theme.colors.defaultHoverColor};
         break;
   }

   return(
      <CardWrapper>
         <CardContent 
            onClick={cardState != "disabled" ? () => {
               cardState != "selected" ? setHover(false) : setHover(true);
               toggle() } : 
               () => {}} 
            onMouseEnter = {() => setHover(true)}
            onMouseLeave = {() => setHover(false)}
            state={cardState} 
            color={cardColor}
            hover={hover}>
            {cardState == "disabled" && <Bg></Bg>}
            <CardHeader><span>Сказочное заморское яство</span></CardHeader>
            <Brand>{brand}</Brand>
            <Flavor>{flavor}</Flavor>
            <Details>
               <Segment><b>{portions}</b> порций</Segment>
               <Segment>{present}</Segment>
               { gift > 2 && <Segment>заказчик доволен</Segment>}
            </Details>
            <Mass><span>{weight}</span>кг</Mass>
         </CardContent>
         <Description state={cardState}>{specification}</Description>
      </CardWrapper>
   )
}

const CardWrapper = styled.div`
   display: flex;
   flex-direction: column;
   row-gap: 0.875em;

   width: 320px;
   height: 509px;

`;

const Bg = styled.div`
   position: absolute;
   inset: 0;
   width: 100%;
   height: 100%;
   background-color: #FFFFFF95;
   
`

const Mass = styled.div`
   position: absolute;
   right: 1rem;
   bottom: 1rem;

   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;

   width: 80px;
   aspect-ratio: 1 / 1;

   clip-path: circle(50% at 50% 50%);

   font-size: 1.313rem;
   color: ${props => props.theme.colors.defaultTextColor};
   white-space: pre-line;

`;

const CardHeader = styled.p`
   font-size: 1rem;
`;

const Brand = styled.p`
   font-size: 3rem;
   font-weight: 700;
`;

const Flavor = styled.p`
   font-size: 1.5rem;
   font-weight: 700;
`;

const CardContent = styled.div`
   display: flex;
   flex-direction: column;
   align-items: flex-start;

   position: relative;
   height: 480px;
   padding: 1.313em 0 0 3.188em;
   
   background-image: url(${Cat});
   background-repeat: no-repeat;
   background-position: Top 208px Left -24px;
   background-color: ${props => props.theme.colors.cardBackgroundColor};

   border: 4px solid ${props =>  props.color.default};
   border-radius: 12px;
   clip-path: polygon(22.8% 0, 100% 0, 100% 100%, 0 100%, 0 15%);
   overflow: hidden;

   font-weight: 400;
   color: ${props => props.state != "disabled" ? props.theme.colors.cardTextSecondary : props.color.default};
   cursor: ${props => props.state != "disabled" ? "pointer" : "default"};

   ::after {
      content: "";
      position: absolute;
      left: -24.69%;
      right: 85.8%;
      top: -12.77%;
      bottom: 88.32%;
      max-width: 124.45px;
      aspect-ratio: 1 / 1;
      transform: rotate(45deg);
      border-right: 4px solid ${props => props.color.default};
      box-sizing: border-box;
   }

   &:hover , &:hover::after{
      border: 4px solid ${props =>  props.hover ? props.color.hover : props.color.default};
   }

   &:hover > ${CardHeader} span {
      ${props => props.state == "selected" && props.hover && `
         display: none;
      `}
   }

   &:hover > ${CardHeader}::before {
      ${props => props.state == "selected" && props.hover && `
         content: "Котэ не одобряет?";
         color: ${props.color.hover};
      `}
   }

   ${Brand} , ${Flavor} {
      color: ${props => props.state != "disabled" ? props.theme.colors.cardTextMain : props.color.default};
   } 

   ${Mass} {
      background-color: ${props => props.color.default};
   }

   &:hover > ${Mass}{
         background-color: ${props =>  props.hover ? props.color.hover : props.color.default};
   }

`;

const Details = styled.div`
   display: flex;
   flex-direction: column;
   align-items: flex-start;
`

const Segment = styled.p`
   font-size: 0.875rem;
`;

const Description = styled.p`
   font-size: 0.8125em;
   color: ${props => props.state != "disabled" ? "white" :props.theme.colors.disabledTextColor};
   text-align: center;

   span {
      color: ${props => props.theme.colors.defaultColor};
      text-decoration: underline dashed;
      cursor: pointer;
   }
`

export default Card;
