/**
 * @author sunag / http://www.sunag.com.br/
 */

THREE.ColorNode = function ( color ) {

	THREE.InputNode.call( this, 'c' );

	this.value = new THREE.Color( color || 0 );

};

THREE.ColorNode.prototype = Object.create( THREE.InputNode.prototype );
THREE.ColorNode.prototype.constructor = THREE.ColorNode;
THREE.ColorNode.prototype.nodeType = "Color";

THREE.NodeMaterial.addShortcuts( THREE.ColorNode.prototype, 'value', [ 'r', 'g', 'b' ] );

THREE.ColorNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.r = this.r;
		data.g = this.g;
		data.b = this.b;

	}

	return data;

};
