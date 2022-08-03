export interface JyskeFrihedBeregnerFormText {
  overskrift: string;
  boligvaerdi: {
    label: string;
    required: string;
    min: string;
  };
  eksisterendeBoliggaeld: {
    label: string;
  };
  afdragsfrihed: {
    label: string;
  };
  fastrenteperiode: {
    label: string;
  };
}

export interface JyskeFrihedBeregnerNoegletalText {
  afdragsfriYdelse: {
    label: string;
  };
  ydelse: {
    label: string;
  };
}

export interface JyskeFrihedBeregnerCtaText {
  overskrift: {
    label: string;
  };
}
