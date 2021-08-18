/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from '@emotion/react'


export function Loading(){
    return (
        <div css={loadingWrapper}>
            <div css={loading}/>
        </div>
    )
}

const loadingWrapper = css `
    display: flex;
    justify-content :center;
    align-items: center;
`;

const loading = css`
     width: 60px;
     height: 60px;
     background-color: #fff;
     border-radius: 50% ;
     position: relative;
     overflow: hidden;
     border: 3px solid;
     animation: spin 1.25s cubic-bezier(.36,.07,.19,.97) infinite;
    
     
     &:after {
        content: '';
        position: absolute;
        width: 60px;
        height: 30px;
        background-color: red;
        border-bottom: 4px solid;
        top: -4px;
     }
     
     &:before {
        content: '';
        position: absolute;
        background-color: #fff;
        width: 15px;
        height:15px;
        border: 4px solid;
        border-radius: 50%;
        bottom: 20px;
        right: 20px;
        z-index: 1;
     }
`;