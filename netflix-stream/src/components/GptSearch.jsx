import React from 'react'
import GptSearchBar from './GptSearchBar';
import {BG_URL} from "../utils/live";
import GptMoviesSuggestion from './GptMoviesSuggestion';
const GptSearch = () => {
  return (
    <div>
      <div className="absolute -z-10">
      <img 
     src={BG_URL} 
     alt="background_logo" />
     </div>
     
     <GptSearchBar />
     <GptMoviesSuggestion />
    </div>
    
  )
}

export default GptSearch;
