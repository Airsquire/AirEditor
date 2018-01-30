/**
 * @author youyue / http://youyue123.github.io
 */

if(!window.AIRSQUIRE) {
    window.AIRSQUIRE = {}
}

AIRSQUIRE.PLYExporter = function () {};

AIRSQUIRE.PLYExporter.prototype = {
    constructor: AIRSQUIRE.PLYExporter,

    parse: function (object) {
        var output = '';
        console.log(object)
        if(!object.isPoints) {
            return
        }
        // vertex count
        var vertexCount = 0;
        if(object.geometry instanceof THREE.BufferGeometry) {
            vertexCount = object.geometry.attributes.position.count;
        } else if (object.geometry instanceof THREE.Geometry) {
            vertexCount = object.geometry.vectices.length;
        }

        output += 'ply\n';
        output += 'format ascii 1.0\n';
        output += 'comment AirEditor generated\n';
        output += 'element vertex ' + vertexCount + '\n';
        output += 'property float x\n';
        output += 'property float y\n';
        output += 'property float z\n';
        output += 'element face 0\n';
        output += 'end_header\n'
        var vertex = new THREE.Vector3();
        if(object.geometry instanceof THREE.BufferGeometry) {
            for (var i = 0 ; i < object.geometry.attributes.position.count; i++) {
                vertex.x =  object.geometry.attributes.position.array[i*3];
                vertex.y =  object.geometry.attributes.position.array[i*3 + 1];
                vertex.z =  object.geometry.attributes.position.array[i*3 + 2];
                // transfrom the vertex to world space
				vertex.applyMatrix4( object.matrixWorld );
                output += vertex.x + ' ';
                output += vertex.y + ' ';
                output += vertex.z + '\n';
            }
        } else if (object.geometry instanceof THREE.Geometry) {
            for (var i = 0; i < object.geometry.vertices.count; i ++) {
                object.geometry.vertices[i].applyMatrix4(object.matrixWorld);
                output += object.geometry.vertices[i].x + ' ';
                output += object.geometry.vertices[i].y + ' ';
                output += object.geometry.vertices[i].z + '\n';
            }
        }
        return output;
    }
}