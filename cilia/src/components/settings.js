import generateHTMLForSettings from '../settingman.js';


export default (props, { $f7, $on, $el, $update, $h }) => {

	$on('pageInit', (e, page) => {
		var html = generateHTMLForSettings();
		var block = elementor('block');
		$el.value.find('.page-content').append(block[0]);
		block.append(html[0]);
	});

	return () => $h `<div class="page">
		<div class="page-content">

		</div>
	</div>`;
}