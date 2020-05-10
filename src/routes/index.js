import express from 'express';
import axios from 'axios';
import $ from 'cheerio';
import { HOST } from '../utils/constants';

const route = express.Router();

route.get('/movies', async (req, res) => {
    const { data } = await axios.get(`${HOST}/trending`);
    const result = getObjectFromHtml($('div #movies', data).children('*'));
    res.status(200).json(result);
});

route.get('/watch/:name', async (req, res) => {
    const pathName = req.params.name.includes('ep') ? 'episode' : 'movie';
    const { data } = await axios.get(`${HOST}/${pathName}/${req.params.name}`);
    console.log($('div iframe', data).attr('src'));
    const href = $('div iframe', data).attr('src');
    const url = HOST + href;
    res.status(200).json({ url });
});

route.get('/series/:name', async (req, res) => {
    const { data } = await axios.get(`${HOST}/series/${req.params.name}`);
    const result = getObjectFromHtml($('div .mbox .movies_small', data).first().children('*'));
    res.status(200).json(result);
});

route.get('/season/:name', async (req, res) => {
    const { data } = await axios.get(`${HOST}/season/${req.params.name}`);
    const result = getObjectFromHtml($('div .mbox .movies_small', data).first().children('*'));
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
    return data.map((i, el) => ({
        u: $(el).attr('href')?.trim(),
        rating: $(el).children('.r').text()?.trim(),
        img: $(el).children('img').attr('src')?.trim(),
        title: $(el).children('.title').text().trim(),
        ribon: $(el).children('.ribbon').text()?.trim(),
    })).get();
}

export default route;
