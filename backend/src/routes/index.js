import express from 'express';
import axios from 'axios';
import $ from 'cheerio';
import url from 'url';
import { HOST } from '../utils/constants';

const route = express.Router();
// get trendig movies
route.get('/movies', async (req, res) => {
    const { page } = req.query;
    const { data } = await axios.get(`${HOST}/trending?page=${page}`);
    const result = getObjectFromHtml($('div #movies', data).children('*'));
    res.status(200).json(result);
});
// get the url to watch either tv show or movie
route.get('/watch/:name', async (req, res) => {
    const pathName = req.params.name.includes('ep') ? 'episode' : 'movie';
    const { data } = await axios.get(`${HOST}/${pathName}/${req.params.name}`);
    console.log($('div iframe', data).attr('src'));
    const href = $('div iframe', data).attr('src');
    const watch = HOST + href;
    res.status(200).json({ watch });
});
// get seasons
route.get('/series/:u', async (req, res) => {
    const { data } = await axios.get(`${HOST}/series/${req.params.u}`);
    const result = getObjectFromHtml($('div .mbox .movies_small', data).first().children('*'));
    res.status(200).json(result);
});
// get episodes
route.get('/season/:name', async (req, res) => {
    const { data } = await axios.get(`${HOST}/season/${req.params.name}`);
    const result = getObjectFromHtml($('div .mbox .movies_small', data).first().children('*'));
    res.status(200).json(result);
});

route.get('/series', async (req, res) => {
    const { page } = req.query;
    const { data } = await axios.get(`${HOST}/tv?page=${page}`);
    const result = getObjectFromHtml($('div #movies', data).children('*'));
    res.status(200).json(result);
});
route.get('/search', async (req, res) => {
    const { q } = req.query;
    const { data } = await axios.get(`${HOST}/autoComplete.php`, {
        params: { q },
    });
    res.status(200).json(data);
});

function getObjectFromHtml(data) {
    return data.map((i, el) => {
        const u = url.parse($(el).attr('href')?.trim()).pathname?.split('/')[2];
        return ({
            u,
            rating: $(el).children('.r').text()?.trim(),
            img: $(el).children('img').attr('src')?.trim(),
            title: $(el).children('.title').text().trim(),
            ribon: $(el).children('.ribbon').text()?.trim(),
        });
    }).get();
}

export default route;
