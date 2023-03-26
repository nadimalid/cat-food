import React, { useState, useLayoutEffect, memo } from "react";
import styled, { useTheme } from "styled-components";
import Cat from "../assets/images/cat.svg";

const Card = (props) => {
   
   const [cardState, setCardState] = useState("");
   const [hover, setHover] = useState(true);
   const {brand, flavor, portions, weight, gift, description, quantity, toggle, selected} = props;
   const theme = useTheme();

   let specification = "";
   let cardColor = {default: "", hover: ""};
   let present = "мышь в подарок";

   useLayoutEffect(() => {
      if(quantity === 0) {
         setCardState("disabled");
       } else if(selected){
         setCardState("selected");
       } else { setCardState(""); }
   },[selected, quantity])
   
   if(gift === 2){
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
         specification = <>Чего сидишь? Порадуй котэ, <span onClick={toggle}>купи</span></>
         cardColor= {default: theme.colors.defaultColor, hover: theme.colors.defaultHoverColor};
         break;
   }

   const onClickHandler = () => {
      if(cardState !== "disabled") {
         cardState !== "selected" ? setHover(false) : setHover(true);
         toggle();
      }
   }

   return(
      <CardWrapper>
         <CardBorder 
            onClick={onClickHandler}
            color={cardColor}
            onMouseLeave = {() => setHover(true)}
            state={cardState} 
            hover={hover}
            >
            <CardContent>
               {cardState === "disabled" && <Bg></Bg>}
               <CardHeader><span>Сказочное заморское яство</span></CardHeader>
               <Brand>{brand}</Brand>
               <Flavor>{flavor}</Flavor>
               <Details>
                  <Segment><b>{portions}</b> порций</Segment>
                  <Segment>{present}</Segment>
                  { gift > 2 && <Segment>заказчик доволен</Segment>}
               </Details>
               <Mass>{weight}<span>кг</span></Mass>
            </CardContent>
         </CardBorder>
         <Description state={cardState}>{specification}</Description>
      </CardWrapper>
   )
}

const CardWrapper = styled.div`
   display: flex;
   flex-direction: column;
   row-gap: 0.875em;

   width: 320px;
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
   right: 0.75rem;
   bottom: 0.75rem;

   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;

   width: 80px;
   aspect-ratio: 1 / 1;

   clip-path: circle(50% at 50% 50%);

   font-size: 1.3em;
   color: ${props => props.theme.colors.defaultTextColor};
   font-size: 2.6em;
   span {
      font-size: 1.3rem;
      line-height: 15px;
   }
`

const CardHeader = styled.p`
   margin-bottom: 0.3em;
   font-size: 1rem;
`

const Brand = styled.p`
   font-size: 3rem;
   font-weight: 700;
`

const Flavor = styled.p`
   font-size: 1.5rem;
   font-weight: 700;
`

const CardBorder = styled.div`
   background-color: ${props => props.color.default};
   border-radius: ${props => props.theme.card.borderRadius};
   clip-path: ${props => props.theme.card.clipPath};
   cursor: ${props => props.state !== "disabled" ? "pointer" : "default"};

   

   &:hover ${CardHeader} span {
      ${props => props.state === "selected" && props.hover && `
         display: none;
      `}
   }

   &:hover ${CardHeader}::before {
      ${props => props.state === "selected" && props.hover && `
         content: "Котэ не одобряет?";
         color: ${props.color.hover};
      `}
   }

   ${Brand} , ${Flavor} {
      color: ${props => props.state !== "disabled" ? props.theme.colors.cardTextMain : props.color.default};
   } 

   ${Mass} {
      background-color: ${props => props.color.default};
   }

   &:hover, &:hover ${Mass}{
         background-color: ${props =>  props.hover ? props.color.hover : props.color.default};
   }
`

const CardContent = styled.div`
   display: flex;
   flex-direction: column;
   align-items: flex-start;

   position: relative;
   height: 472px;
   margin: 4px;
   padding: 1em 0 0 2.9em;
   
   background-image: url(${Cat});
   background-repeat: no-repeat;
   background-position: Top 208px Left -24px;
   background-color: ${props => props.theme.colors.cardBackgroundColor};

   
   border-radius: ${props => props.theme.card.borderRadius};;
   clip-path: ${props => props.theme.card.clipPath};
   overflow: hidden;

   font-weight: 400;
   color: ${props => props.state !== "disabled" ? props.theme.colors.cardTextSecondary : props.color.default};
`;

const Details = styled.div`
   display: flex;
   flex-direction: column;
   align-items: flex-start;

   margin-top: 0.9em;
`

const Segment = styled.p`
   font-size: 0.875rem;
`;

const Description = styled.p`
   font-size: 0.8125em;
   color: ${props => props.state !== "disabled" ? "white" :props.theme.colors.disabledTextColor};
   text-align: center;

   span {
      color: ${props => props.theme.colors.defaultColor};
      text-decoration: underline dashed;
      cursor: pointer;
   }

   span::after {
      content: ".";
      display: inline-block;
      text-decoration: none;
   }
`

export default memo(Card);
