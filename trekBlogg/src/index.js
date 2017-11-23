import React from 'react';
import ReactDOM from 'react-dom';
import BloggApp from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

var bloggs = [
    {
        title: 'Spock Dead',
        link: 'www.bbc.com/news/entertainment-arts-31662024',
        username: 'PByrne',
        comments: [],
        upvotes: 10
    },
    {
        title: 'Discovery hype too much.',
        link: 'https://www.reddit.com/r/startrek/comments/.../the_star_trek_discovery_hype_thread/',
        username: 'KKilagrew',
        comments: [],
        upvotes: 12
    },
    {
        title: 'Was Janeway a control friek',
        link: 'https://www.trekbbs.com › Star Trek Series | 2364 - 2378 › Star Trek: Voyager',
        username: 'COSullivan',
        comments: [],
        upvotes: 12
    },
    {
        title: 'Do the transporters actually kill you?',
        link: 'https://scifi.stackexchange.com/.../in-star-trek-does-the-original-die-in-teleportation',
        username: 'KMurphy',
        comments: [],
        upvotes: 2
    }
];

ReactDOM.render(
    <BloggApp bloggs={bloggs} />,
    document.getElementById('root')
);