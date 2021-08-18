import React from "react";
import {Global, css} from "@emotion/react";
import ScrollIcon from '../assets/images/scroll-icon.png';

const breakpoints = [480, 768, 1024, 1440]

const mq = breakpoints.map(
    bp => `@media (max-width: ${bp}px)`
)

export const GlobalStyles = () => (

    <Global styles={
        css`
        
        body {
           background: rgb(255,255,255);
           background: linear-gradient(45deg, rgba(255,255,255,1) 0%, rgba(231,238,250,1) 40%, rgba(227,235,249,1) 60%, rgba(223,232,247,1) 100%);
        }
        
        * {
            font-family: 'Press Start 2P';
            box-sizing: border-box;
        }
        
        ::-webkit-scrollbar {
          width: 0;
        }
        
        /* Track */
        ::-webkit-scrollbar-track {
          background: transparent; 
        }
         
        /* Handle */
        ::-webkit-scrollbar-thumb {
          background: transparent; 
        }
        
        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: transparent; 
        }
        
        a {
            &:hover {
                text-decoration: none;
            }
        }
        
        .default-section {
            padding: 100px 0;
            overflow: hidden;
            position: relative;
            
            &:before {
                content: "";
                width: 50vmax;
                height: 50vmax;
                position: absolute;
                background: rgba(0,0,0,0.07);
                left: -20vmin;
                top: -20vmin;
                animation: morph 15s linear infinite alternate, spinbg 20s linear infinite;
                z-index: 1;
                will-change: border-radius, transform;
                transform-origin: 55% 55%;
                pointer-events: none;
            }
            
            &:after {
                content: "";
                width: 40vmax;
                height: 40vmax;
                position: absolute;
                background: rgba(0,0,0,0.07);
                left: auto;
                right: -10vmin;
                top: auto;
                bottom:0;
                z-index: 1;
                will-change: border-radius, transform;
                pointer-events: none;
                animation:morph 10s linear infinite alternate, spin 26s linear infinite reverse;
                transform-origin:20% 20%
            }
            
            &.type-relative {
                position: relative;
            }
            
            &.type-first {
               padding: 0 0 100px;
               overflow: hidden;
            }
            
            &.type-no-top {
              padding: 0 0 100px;
            }
            
            &.type-no-bottom {
              padding: 100px 0 0;
              min-height: 100vh;
            }
        }
        
        .banner-wrapper {
           position: relative;
           min-height: 100vh;
           width: 100%;
           display: flex;
           justify-content: center;
           align-items: center;
           
           .overlay {
                display: none;
                position: absolute;
                top: 0;
                background-color: rgba(0,0,0,0.8);
                z-index: 2;
                width: 100%;
                height: 100vh;
           }
           
           .banner {
                position: absolute;
                top: 0;
                width: 100%;
                min-height: 100vh;
                z-index: 0;
                object-fit: cover;
            }
            
           .type-start {
             display:none;
           }
           
           .container {
             display: block;
           }
            
            &.type-overlay {
                .overlay {
                    display: block;
                }
                .type-start {
                    display: block;
                    z-index: 3;
                }
                
                .container {
                    display: none;
                }
            }
        }
        
        .btn-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14.2px;
            
            button {
               &:hover {
                cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC) 14 0,pointer;
               }
            }
     
        }
        
        .pokemon-list-wrapper {
            position: relative;
            left: 0;
            transition: all 1s ease-in-out;
            
            &.type-detail {
               position: absolute;
               left: -15rem;
            }
            
            &:before {
                background-image: url('${ScrollIcon}');
                display: inline-block;
                background-repeat: no-repeat;
                background-size: contain;
                width: 70px; 
                height: 70px;
                content: "";
                position: absolute;
                left: 9.5rem;
                top: calc(100% - 24rem);
                animation: float 6s linear infinite;
            }
        }
        
        .select-pokemon-wrapper {
            flex: 1 1 90%;
            margin-left: 4rem;
            margin-right: 2rem;
            padding: 0 1rem;
        }
        
        .btn-custom {
            margin: 2rem 0.5rem;
            font-size: 10px;
        }
        
        .nav-tabs {
            border-bottom-color: transparent;
        }
        
        .nav-item {
            font-size: 10px;
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;    
        }
        
        .btn-secondary {
            background-color: transparent;
            color: #333;
            border-color: unset;
            border: unset;
            
            &:focus {
                color: #333 !important;
                border-color: unset;
                border: unset;
                background-color: transparent;
                box-shadow: unset !important;
            }
        }
        
        .btn-primary {
        }
        
        .form-control {
            border: 5px solid #333;
            
            &:focus {
       
            }
        }
        
        
        .nav-link {
            color: #333;
            text-align: center;
            width: 100%;
            transition: all 0.5s ease-in-out;
            
            &:hover {
                color: #FFF;
                border: 1px solid transparent;
                border-color: transparent !important;
                border-radius: 0;
                background-color: rgba(204, 0, 0, 0.6) !important;
            }
            
            &.active {
                background-color: rgba(204, 0, 0, 0.5) !important;
                color: #FFF !important;
                border-color: transparent !important;
                border-radius: 0;
            }
        }
        
        .h-80 {
            height: 80%;
            
            &.fade-in-text {
                -webkit-animation: tracking-in-expand 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
                animation: tracking-in-expand 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
            }
        }
        
        .arrow-icon-wrapper {
            position:absolute;
            z-index: 10;
            top: 50%;
            left: -20rem;
            transition: all 2s ease-in-out;
            

            &.type-show {
              left: 0;
            -webkit-animation: slide-right 1.5s ease-in-out infinite alternate both;
            animation: slide-right 1.5s ease-in-out infinite alternate both;
            }
            
            &.type-list {
                display: none;
            }
            
            img {
                width: 50px;
                height: 50px;
                object-fit: contain;
            }
        }
        
        .modal-dialog {
            ${mq[0]} {
              margin: 1rem;
            }
        }
        
        .modal-content {
            border: unset;
            padding: 30px 0;
            position: relative;
        }
       
        @keyframes morph{
            0%{
                border-radius:40% 60% 60% 40% / 70% 30% 70% 30%
            }
            100%{
                border-radius:40% 60%
            }
        }
        
        @keyframes spinbg{
            to{
                transform:rotate(1turn)
            }
        }
        
        @-webkit-keyframes slide-right {
          0% {
            -webkit-transform: translateX(0);
                    transform: translateX(0);
          }
          100% {
            -webkit-transform: translateX(10px);
                    transform: translateX(10px);
          }
        }
        @keyframes slide-right {
          0% {
            -webkit-transform: translateX(0);
                    transform: translateX(0);
          }
          100% {
            -webkit-transform: translateX(10px);
                    transform: translateX(10px);
          }
        }
        
        @keyframes spin{
            0 { transform: translate(0, 0) rotate(0); }
            20% { transform: translate(-10px, 0) rotate(-20deg); }
            30% { transform: translate(10px, 0) rotate(20deg); }
            50% { transform: translate(-10px, 0) rotate(-10deg); }
            60% { transform: translate(10px, 0) rotate(10deg); }
            100% { transform: translate(0, 0) rotate(0); }
        }
        
        @keyframes float {
            0% {
                transform: translatey(0px);
            }
            25% {
                transform: translatey(5px);
            }
            50% {
                transform: translatey(0px);
            }
            75% {
                transform: translatey(-5px);
            }
            100% {
                transform: translatey(0px);
            }
        }
        
        @-webkit-keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        
        
        @-webkit-keyframes tracking-in-expand {
          0% {
            letter-spacing: -0.5em;
            opacity: 0;
          }
          40% {
            opacity: 0.6;
          }
          100% {
            opacity: 1;
          }
        }
        @keyframes tracking-in-expand {
          0% {
            letter-spacing: -0.5em;
            opacity: 0;
          }
          40% {
            opacity: 0.6;
          }
          100% {
            opacity: 1;
          }
        }
        
        
        ${mq[0]} {
            .default-section {
                &.type-no-bottom {
                    padding: 80px 0 0;
                    min-height: 95vh;
                    overflow: hidden;
                }
            }
        
            .content-mobile {
                flex-direction: column-reverse;
            }
            
            .text-mobile {
                font-size: 16px !important;
            }
            
            .pokemon-list-wrapper {
                bottom: 5rem;
                position:absolute;
                width: 100%;
                left: unset;
                right: 0;
                opacity: 1;
                visibility: visible;
                                
                &.type-detail {
                    visibility: hidden;
                    left: unset;
                    opacity: 0;
                    right: -30rem;
                }
                &:before {
                    display: none;
                }
            }
            
            .arrow-icon-wrapper {
                top: 25px;
                
                &.type-show {
                    animation: unset;
                    left: 10px;
                }
                
                 &.type-list {
                    display: block;
                }
                
                img {
                    transform: rotate(180deg);
                    width: 30px;
                    height: 30px;
                }
            }
            
            .btn-wrapper {
                display: none;
            }
            
            .select-pokemon-wrapper {
                margin: unset;
            }
            
            .h-80 {
                height: 50vh;
            }
            
        }
     `
    }/>
)