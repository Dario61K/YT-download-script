const fs = require('fs')
const path = require('path')
const readline = require('readline')
const pc = require('picocolors')
const ytdl = require('ytdl-core')


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

var r

rl.question(pc.red('URL: '), (url) => {

  ytdl.getInfo(url).then(info => {
    console.log(pc.red('\nFormatos disponibles: \n'));
    console.log(`• iTag 140, Audio: AUDIO_QUALITY_MEDIUM`);
    info.formats.forEach((format, i) => {
      if (format.container == 'mp4' && format.audioQuality != undefined && format.qualityLabel != null) {
        console.log(`• iTag ${format.itag}, Calidad: ${format.qualityLabel}, Tipo: ${format.container}, Audio: ${format.audioQuality}`);
      }

    });

    rl.question(pc.red('\nElige un iTag: '), (tag) => {

      if (tag == '140') {
        r = 'audio'
        l = '.m4a'
      }
      else {
        r = 'video'
        l = '.mp4'
      }

      const name = info.videoDetails.title.replace(/[^\w\s]/gi, '') + l
      const format = ytdl.chooseFormat(info.formats, { quality: tag})
      const down = ytdl(url, { format: format })
      const writee = fs.createWriteStream(path.join('..', r, name))

      let progres = 0
      console.log(pc.blue(`\nDescargando ${name}`))
      down.on('progress', (chunkLength, downloadedBytes, totalBytes) => {
        progres += chunkLength;
        let percent = (progres / totalBytes) * 100;
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(pc.italic(`${(progres / Math.pow(1024, 2)).toFixed(2)}/${(totalBytes / Math.pow(1024, 2)).toFixed(2)}mg ${percent.toFixed(2)}%`));
      });

      down.pipe(writee);
      writee.on('finish', () => {
        console.log(pc.yellow(`\nDescarga completada`));
      });

      rl.close();
    })

  }).catch(err => {
    console.error('Error al obtener información del vídeo:', err);

  });
})
