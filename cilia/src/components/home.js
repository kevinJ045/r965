export default (props, { $f7, $on, $el, $update, $h }) => {
	return () => $h `<div class="page">
		<div class="page-content">
			<div class="block">

				<div class="block-title-medium magic-title ml6">
					<span class="text-wrapper">
					    <span class="letters">
					    	Hello %1${USER.name}%
					    </span>
					</span>
				</div>

			</div>
		</div>
	</div>`;
}