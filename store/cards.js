
export const state = () => ({

  currentDsId : undefined,
  currentCardsArrray : [],
  currentCardId : undefined,

  currentCardIndex : 0,

  isClicking : undefined,
  hadClick : false,

})

export const getters = {

  getCardsArrrayLength : state => {
    return state.currentCardsArrray.length
  },

}

export const mutations = {
  
  setCurrentDsId(state, dsId){
    console.log("S-cards-M-setCurrentDsId / dsId : ", dsId )
    state.currentDsId = dsId
  },
  setCurrentCardsArrray(state, cardsArrray){
    console.log("S-cards-M-setCurrentCardsArrray / cardsArrray : ", cardsArrray )
    state.currentCardsArrray = cardsArrray
  },
  setCurrentCardId(state, cardId){
    console.log("S-cards-M-setCurrentCardId / cardId : ", cardId )
    state.currentCardId = cardId
  },

  setCurrentCardIndex(state, cardIndex){
    console.log("S-cards-M-setCurrentCardIndex / cardIndex : ", cardIndex )
    state.currentCardIndex = cardIndex
  },
  resetCurrentCardIndex(state){
    console.log("S-cards-M-resetCurrentCardIndex ..." )
    state.currentCardIndex = 0
  },

  nextCurrentCardIndex( state ){
    state.currentCardIndex += 1
  },

  setPreviousCurrentCardIndex(state){
    let requestedIndex = state.currentCardIndex -= 1
    if (requestedIndex < 0 ){
      state.currentCardIndex = state.currentCardsArrray.length - 1
    } else {
      state.currentCardIndex = requestedIndex
    }
  },

  setIsClicking(state, isClick){
    console.log("S-cards-M-setIsClicking / isClick : ", isClick )
    state.isClicking = isClick
  },
  setHadClick(state){
    console.log("S-cards-M-setHadClick ..." )
    state.hadClick != state.hadClick
  },

}

export const actions = {


}  