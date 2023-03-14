export default (props, { $f7, $on, $el, $update, $h }) => {
	return () => $h `<div class="page">
		<div class="page-content">
			<div class="block">

				<div class="block-title-medium magic-title">Hello <b b>${USER.name}</b></div>

			</div>
		</div>
	</div>`;
}