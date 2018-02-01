/**
 * @author youyue / http://youyue123.github.io
 */

if(!window.AIRSQUIRE) {
    window.AIRSQUIRE = {}
}

AIRSQUIRE.PLYExporter = function () {
    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    
};

AIRSQUIRE.PLYExporter.prototype = {
    constructor: AIRSQUIRE.PLYExporter,
    saveToFile: function (object) {
        let header = '';
        
        if(!object.isPoints) {
            return
        }
        var vertexCount = 0;
        if(object.geometry instanceof THREE.BufferGeometry) {
            vertexCount = object.geometry.attributes.position.count;
        } else if (object.geometry instanceof THREE.Geometry) {
            vertexCount = object.geometry.vectices.length;
        }

        const fileStream = streamSaver.createWriteStream('test.ply')
        const writer = fileStream.getWriter()
        const encoder = new TextEncoder

        header += 'ply\n';
        header += 'format ascii 1.0\n';
        header += 'comment AirEditor generated\n';
        header += 'element vertex ' + vertexCount + '\n';
        header += 'property float x\n';
        header += 'property float y\n';
        header += 'property float z\n';
        header += 'element face 0\n';
        header += 'end_header\n'

        writer.write(encoder.encode(header))

        var vertex = new THREE.Vector3();
        let body = ''
        if(object.geometry instanceof THREE.BufferGeometry) {
            for (var i = 0 ; i < object.geometry.attributes.position.count; i++) {
                vertex.x =  object.geometry.attributes.position.array[i*3];
                vertex.y =  object.geometry.attributes.position.array[i*3 + 1];
                vertex.z =  object.geometry.attributes.position.array[i*3 + 2];
                // transfrom the vertex to world space
                vertex.applyMatrix4( object.matrixWorld );
                body += vertex.x + ' ';
                body += vertex.y + ' ';
                body += vertex.z + '\n';
                if (body.length >= 1024 * 1024 * 20) {
                    writer.write(encoder.encode(body))
                    body = ''
                }
            }
        } else if (object.geometry instanceof THREE.Geometry) {
            for (var i = 0; i < object.geometry.vertices.count; i ++) {
                object.geometry.vertices[i].applyMatrix4(object.matrixWorld);
                body += object.geometry.vertices[i].x + ' ';
                body += object.geometry.vertices[i].y + ' ';
                body += object.geometry.vertices[i].z + '\n';
                if (body.length >= 1024 * 1024 * 20) {
                    writer.write(encoder.encode(body))
                    body = ''
                }
            }
        }
        writer.write(encoder.encode(body))
        writer.close()
    }
}