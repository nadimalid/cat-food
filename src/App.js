import React, { useState} from "react";
import styled from "styled-components";
import Theme from "./Theme.js";
import Card from "./components/Card.js";
import bg from "./assets/images/background.png";

function App() {

   const [dockFlavour, setDockFlavour] = useState({amount: 1, selected: false});
   const [fishFlavour, setFishFlavour] = useState({amount: 1, selected: false});
   const [chickenFlavour, setChickenFlavour] = useState({amount: 1, selected: false});


   return (
      <Theme>
         <AppWrapper>
            <PageContent>
               <PageHeader>Ты сегодня покормил кота?</PageHeader>
               <Cards>
                  <Card 
                     brand="Нямушка"
                     flavor="с фуа-гра"
                     weight="0,5"
                     portions="10"
                     description="Печень утки разварная с артишоками."
                     gift="1"
                     quantity={dockFlavour.amount}
                     selected={dockFlavour.selected} toggle={() => setDockFlavour(prevState => {return { ...prevState, selected: !prevState.selected }}) }
                  />
                  <Card 
                     brand="Нямушка"
                     flavor="с рыбой"
                     weight="2"
                     portions="40"
                     description ="Головы щучьи с чесноком да свежайшая сёмгушка."
                     gift="2"
                     quantity={fishFlavour.amount}
                     selected={fishFlavour.selected} toggle={() => setFishFlavour(prevState => {return { ...prevState, selected: !prevState.selected }}) }
                  />
                  <Card 
                     brand="Нямушка"
                     flavor="с курой"
                     weight="5"
                     portions="100"
                     description="Филе из цыплят с трюфелями в бульоне."
                     gift="5"
                     quantity={chickenFlavour.amount}
                     selected={chickenFlavour.selected} toggle={() => setChickenFlavour(prevState => {return { ...prevState, selected: !prevState.selected }}) }
                  />
               </Cards>
            </PageContent>
         </AppWrapper>
      </Theme>
   );
}

const AppWrapper = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   min-height: 100vh;
   background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 5e-05) 49.88%, rgba(0, 0, 0, 0.5) 100%);
   background-image: url(${bg});
   background-size: cover;
`;

const PageContent = styled.div`
   display: flex;
   flex-direction: column;
   // justify-content: center;
   align-items: center;
   gap: 1.5rem;
`;

const PageHeader = styled.h1`
   font-family: "Exo2.0";
   font-size: 2.25em;
   font-weight: 100;
   text-align: center;
   color: ${props => props.theme.colors.defaultTextColor};
`;

const Cards = styled.div`
   display: flex;
   flex-wrap: wrap;
   gap: 80px;
   justify-content: center;
`;

export default App;
