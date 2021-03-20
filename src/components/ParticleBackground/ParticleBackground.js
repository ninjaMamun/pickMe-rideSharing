import React from 'react';
import Particles from 'react-particles-js';
import ParticleConfig from './particle-config'


export default function ParticleBackground(props){
    return (
        <Particles params={ParticleConfig}>{props.children}</Particles>
    );
}