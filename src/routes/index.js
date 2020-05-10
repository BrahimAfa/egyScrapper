import express from 'express';
import axios from 'axios';
import $ from 'cheerio';
import url from 'url';
import { HOST } from '../utils/constants';

const route = express.Router();
route.get('/', async (req, res) => {
    res.set('content-type', 'text/html');
    const { data } = await axios.get(`${HOST}/trending`);
    // console.log($('div iframe', data).attr('src'));
    const urlx = $('div #movies', data).children('*').each((i, el) => {
        const href = $(el).attr('href');
        console.log('chref=>', href);
        const { pathname } = url.parse(href);
        $(el).attr('href', pathname);
    });
    console.log(urlx);

    res.status(200).send(`${urlx}`).send("hello");
});
route.get('/movie/:name', async (req, res) => {
    res.set('content-type', 'text/html');
    const { data } = await axios.get(`${HOST}/movie/${req.params.name}`);
    console.log($('div iframe', data).attr('src'));
    const urlx = $('div iframe', data).attr('src');
    res.redirect(HOST + urlx);
});
route.post('/search/:name', async (req, res) => {
    res.set('content-type', 'text/html');
    const { data } = await axios.get(`${HOST}/autoComplete.php?q=${req.params.name}`);
    console.log($('div iframe', data).attr('src'));
    const urlx = $('div iframe', data).attr('src');
    res.redirect(HOST + urlx);
});
export default route;
