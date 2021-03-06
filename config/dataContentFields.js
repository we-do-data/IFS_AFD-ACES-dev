export const DataContentFields = Object.freeze([

  {
    // key === GSheet ID from .env file
    dsId : "aces-contents",
    contentsFields : [

      {
        itemAppFieldCode : "favText", 
        en: "content-en",
        fr: "content-fr",
        trimLimit : 25,
      },

      {
        itemAppFieldCode : "mainContent", 
        en: "content-en",
        fr: "content-fr",
        trimLimit : 25,
      },
      {
        itemAppFieldCode : "link_01_url", 
        en: "rsc-01-url",
        fr: "rsc-01-url",
        trimLimit : false,
      },
      {
        itemAppFieldCode : "link_01_text", 
        en: "rsc-01-title",
        fr: "rsc-01-title",
        trimLimit : 25,
      },
      {
        itemAppFieldCode : "link_02_url", 
        en: "rsc-02-url",
        fr: "rsc-02-url",
        trimLimit : false,
      },
      {
        itemAppFieldCode : "link_02_text", 
        en: "rsc-02-title",
        fr: "rsc-02-title",
        trimLimit : 25,
      },
      {
        itemAppFieldCode : "link_03_url", 
        en: "rsc-03-url",
        fr: "rsc-03-url",
        trimLimit : false,
      },
      {
        itemAppFieldCode : "link_03_text", 
        en: "rsc-03-title",
        fr: "rsc-03-title",
        trimLimit : 25,
      },
      {
        itemAppFieldCode : "link_04_url", 
        en: "rsc-04-url",
        fr: "rsc-04-url",
        trimLimit : false,
      },
      {
        itemAppFieldCode : "link_04_text", 
        en: "rsc-04-title",
        fr: "rsc-04-title",
        trimLimit : 25,
      },
      {
        itemAppFieldCode : "link_05_url", 
        en: "rsc-05-url",
        fr: "rsc-05-url",
        trimLimit : false,
      },
      {
        itemAppFieldCode : "link_05_text", 
        en: "rsc-05-title",
        fr: "rsc-05-title",
        trimLimit : 25,
      },

    ]
  }

])

export const CardResourcesFields = Object.freeze([
  {
    dsId : "aces-contents",
    favFields : [
      { textFieldCode: 'rsc-01-title', linkFieldCode: 'rsc-01-url' },
      { textFieldCode: 'rsc-02-title', linkFieldCode: 'rsc-02-url' },
      { textFieldCode: 'rsc-03-title', linkFieldCode: 'rsc-03-url' },
      { textFieldCode: 'rsc-04-title', linkFieldCode: 'rsc-04-url' },
      { textFieldCode: 'rsc-05-title', linkFieldCode: 'rsc-05-url' },
    ]
  },
])

export const DataIdFields = Object.freeze([
  {
    dsId : "aces-contents",
    idField : "card-id"
  },
])
