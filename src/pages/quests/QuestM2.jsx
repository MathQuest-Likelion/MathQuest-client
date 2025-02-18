import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import * as QM2 from '../../styles/quests/QuestM2Styles';
import QuestHeader from '../../shared/components/QuestHeader';
import Rectangle5 from '../../assets/images/rectangle5.png';
import Note from '../../assets/images/note.png';
import Footer from '../../shared/components/Footer';
import Rectangle from '../../assets/images/rectangle.png';
import Fire from '../../assets/images/fire.png';
import Hill from '../../assets/images/hill.png';
import Sun from '../../assets/images/sun.png';

const QuestM2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {level} = location.state || {};

  if (!level) {
    console.error('No state passed to QuestM2');
    navigate('/'); 
    return null;
  }

  console.log('Received level:', level);

  const handleQuestM2H = () => {
    const difficulty = 3;
    console.log(`Navigating to QuestM2H with level: ${level}, difficulty: ${difficulty}`);
    navigate('/questM2H', { state: { level, difficulty } });
  };

  const handleQuestM2M = () => {
    const difficulty = 2;
    console.log(`Navigating to QuestM2M with level: ${level}, difficulty: ${difficulty}`);
    navigate('/questM2M', { state: { level, difficulty } });
  };

  const handleQuestM2L = () => {
    const difficulty = 1;
    console.log(`Navigating to QuestM2L with level: ${level}, difficulty: ${difficulty}`);
    navigate('/questM2L', { state: { level, difficulty } });
  };

  return (
    <QM2.Container>
      <QuestHeader />
      <QM2.Profile>
        <QM2.PhotoBack>
          <img id="Rectangle5" src={Rectangle5} />
        </QM2.PhotoBack>
        <QM2.Photo>
          <img id="Note" src={Note} />
        </QM2.Photo>
        <QM2.Text>{level}</QM2.Text>
      </QM2.Profile>
      <QM2.QuestList>퀘스트 목록</QM2.QuestList>
      <QM2.Qe4Hard onClick={handleQuestM2H}>
        <QM2.Qe4Back>
          <img id="Rectangle" src={Rectangle} />
          <QM2.Qe4photoback>
            <img id="Rectangle5" src={Rectangle5} />
          </QM2.Qe4photoback>
          <QM2.Qe4photo>
            <img id="Fire" src={Fire} />
          </QM2.Qe4photo>
          <QM2.TextHard>난이도 (상)</QM2.TextHard>
          <QM2.TextCount>20 문항</QM2.TextCount>
        </QM2.Qe4Back>
      </QM2.Qe4Hard>
      <QM2.Qe4Middle onClick={handleQuestM2M}>
        <QM2.Qe4BackMiddle>
          <img id="Rectangle" src={Rectangle} />
          <QM2.Qe4photobackMiddle>
            <img id="Rectangle5" src={Rectangle5} />
          </QM2.Qe4photobackMiddle>
          <QM2.Qe4photoMiddle>
            <img id="Hill" src={Hill} />
          </QM2.Qe4photoMiddle>
          <QM2.TextMiddle>난이도 (중)</QM2.TextMiddle>
          <QM2.TextCountMiddle>20 문항</QM2.TextCountMiddle>
        </QM2.Qe4BackMiddle>
      </QM2.Qe4Middle>
      <QM2.Qe4Low onClick={handleQuestM2L}>
        <QM2.Qe4BackLow>
          <img id="Rectangle" src={Rectangle} />
          <QM2.Qe4photobackLow>
            <img id="Rectangle5" src={Rectangle5} />
          </QM2.Qe4photobackLow>
          <QM2.Qe4photoLow>
            <img id="Sun" src={Sun} />
          </QM2.Qe4photoLow>
          <QM2.TextLow>난이도 (하)</QM2.TextLow>
          <QM2.TextCountLow>20 문항</QM2.TextCountLow>
        </QM2.Qe4BackLow>
      </QM2.Qe4Low>
      <Footer />
    </QM2.Container>
  );
};
export default QuestM2;