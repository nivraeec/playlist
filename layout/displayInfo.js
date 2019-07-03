const display = {
	props: ["music"],
	data(){
		return{

		}
	},
	template: `
		<div class="er-displayMusic">
			<div v-if="music != null" class="cont">
				<div><img :src="music['im:image'][2].label" :alt="music['im:name'].label"></div>
				<div class="view-info">
					<div class="title"><span>#{{music.mid + 1}}</span> {{music["im:name"].label}}</div>
					<div class="artist">
						<a :href="music['im:artist'].attributes != null? music['im:artist'].attributes.href : '#'" target="_blank">{{music["im:artist"].label}}</a><span>|</span>{{music.category.attributes.label}}</div>
					<div class="info">
						Release Date: {{music["im:releaseDate"].attributes.label}}<br>
						Songs: {{music["im:itemCount"].label}} Songs<br>
						<div class="rights">{{music.rights.label}}</div>
					</div>
					<div class="price">{{music["im:price"].label}} {{music["im:price"].attributes.currency}}</div>
					<div class="tr">
						<button class="btn btn-success" :class="music.favorite? 'active' : ''" @click="addFavorite(music.mid)">
							<i class="fa fa-star"></i>{{!music.favorite? 'Add' : 'Remove'}} Favorite
						</button>&nbsp;&nbsp;
						<a :href="music.id.label" target="_blank" class="btn btn-primary"><i class="fa fa-music"></i>Visit iTunes</a>
					</div>
				</div>
			</div>
		</div>
	`,
	methods: {		
		addFavorite(id){
			this.$emit("favorite", id)
		}
	}
}

export default display