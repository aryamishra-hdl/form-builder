import React, { useRef } from 'react'

const getXPath = (element) => {
    if (!element) return "";
    if (element.id) return `#${element.id}`;
    const parts = [];
    while (element && element.nodeType === Node.ELEMENT_NODE) {
      let index = 1;
      let sibling = element.previousSibling;
      while (sibling) {
        if (
          sibling.nodeType === Node.ELEMENT_NODE &&
          sibling.nodeName === element.nodeName
        ) {
          index++;
        }
        sibling = sibling.previousSibling;
      }
      const tagName = element.nodeName.toLowerCase();
      const nth = index > 1 ? `[${index}]` : "";
      parts.unshift(`${tagName}${nth}`);
      element = element.parentNode;
    }
    return "/" + parts.join("/");
  };

  const getCSSSelector = (element) => {
    if (!element) return;
    if (element.id) return `#${element.id}`;
    const path = [];
    while (element && element.nodeType === Node.ELEMENT_NODE) {
      let selector = element.nodeName.toLowerCase();
      if (element.className) {
        selector += `.${[...element.classList].join(".")}`;
      }
      let sibling=element;
      let siblingIndex=1;
      while((sibling=sibling.previousElementSibling)){
        if(sibling.nodeName===element.nodeName){
            siblingIndex++
        }
      }
      if(siblingIndex===1){
        selector+=''
      }
      else if(siblingIndex>1){
          selector+=`:nth-of-type(${siblingIndex})`
      }
      path.unshift(selector);
      element=element.parentElement;
    }
    return path.join('>');
  };


const useElementsSelectors = () => {
    const ref=useRef(null);
    const getSelectors=()=>{
        const el=ref.current;
        return {
            xpath:getXPath(el),
            css_selector:getCSSSelector(el),
            value:el?.value || '',
        }
    }
  return [ref,getSelectors]
}

export default useElementsSelectors