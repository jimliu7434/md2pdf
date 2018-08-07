const markdownpdf = require("markdown-pdf");
const through = require('through2');
const cheerio = require('cheerio');
const path = require('path');

const { project, version, sequence } = require(`./config`);

const getpath = (fileName) => path.join(__dirname, 'doc', fileName);

const preProcessHtml = function () {
    return through(function (chunk, encoding, callback) {
        const $ = cheerio.load(chunk);

        // process md local link for Windows OS
        $('img[src]').each(function () {
            let imagePath = $(this).attr('src');
            imagePath = path.resolve(__dirname, imagePath);
            $(this).attr('src', 'file://' + (process.platform === 'win32' ? '/' : '') + imagePath);
        });

        // add link for Chapters
        // let idx = 0;
        // const idPrefix = 'lnk';
        // $('.chapters li').each(function () {
        //     let txt = $(this).text();
        //     //console.log(txt);
        //     const anchor = `${idPrefix}_${idx}`;
        //     const a = $('<a></a>');
        //     a.attr('href', `#${anchor}`);
        //     $(this).wrap(a);
        //     const span = $('<span></span>');
        //     span.attr('id', anchor);
        //     $(`h1,h2,h3,h4,h5,h6`).filter(function () {
        //         return $(this).text() === txt;
        //     }).wrap(span);
        //     idx++;
        // });

        console.log($.html());      // html content to convert to PDF
        this.push($.html());
        callback();
    });
};

const preProcessMd = function () {
    return through(function (chunk, encoding, callback) {
        // do whatever you want like REPLACE
        //this.push(chunk.replace(/foo/g, "bar") + "\n");
        this.push(chunk.toString());
        callback();
    });
};

const target = getpath(`${project}_${version}.pdf`);

// process
markdownpdf({
    cssPath: './pdf.css',   // custom css style file path
    preProcessMd,           // md -> html preprocess method
    preProcessHtml,         // html -> pdf preprocess method
    remarkable: {           // remarkable: md -> html module options
        html: true,
        breaks: true,
        plugins: [require('remarkable-classy')],  // you can add plugins for remarkable
    },
}).concat.from(sequence.map(getpath)).to(target, () => {
    console.log(`${target} Done`);
});