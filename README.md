Script para descargar videos de Youtube
Cosas a tener en cuenta:

1- Es muy posible que muchos videos solo tengan las opciones 360p y/o audio, esto se debe a que una parte de los videos de youtube usan iTags que solo proporcionan imagen (no hay audio)
entonces, filtré esos iTags de forma tal que solo aparecieran los formatos que tiene audio y video
se podria descargar ambos por separado y luego combinarlos(en caso de querer una mayor calidad de video, pero eso requiere otro procedimiento el cual aun no esta implementado)

2- La ruta de descarga, el script tiene ya un ruta de descarga con la siguiente jerarquia

|
| -- audio
| -- video
| -- YT download

Por tanto, debes crear 2 carpetas, audio y video respectivamente en el mismo nivel que la carpeta del script (o puedes cambiar la ruta)
