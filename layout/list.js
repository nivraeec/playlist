const list = {
	props: ["list", "show", "showList", "title"],
	data(){
		return {
			mlist: this.list || null,
			listSearch: null,
			pickColor: false,
			slist: false,
			ltitle: this.title || "Title Page",
			current: null,
			filt: false
		}
	},
	template: `
		<div class="er-playlist" v-if="show">
			<div class="title"><i class="fa fa-disc"></i>{{ltitle}}</div>
			{{showList}}
			<div class="intro" v-if="!slist">
				<img src="./resource/images/itunes.png" alt="iTunes Logo">
				These are the Top 100 Albums of all time in iTunes. See some of your favorite artists.<br><br>
				<button class="btn btn-primary showAlbumList" @click="showNowList">Show List</button>
			</div>
			<ul v-else>
				<li v-for="(v,k) in mlist" @click="change(v, k)" :class="v.played? 'active' : ''" v-if="v.show">
					<span class="num">{{k + 1}}</span>
					<div class="info">
						{{v["im:name"].label}}
						<div class="artist">{{v["im:artist"].label}}</div>
					</div>
					<i class="fa fa-star fr" v-if="v.favorite"></i>
				</li>
			</ul>
			<div class="actions">
				<div class="search sec" :style="'visibility:' + (slist? 'visible':'hidden')">
					<input type="text" placeholder="Search" @change="searchList" v-model="listSearch">
					<i class="fa fa-search" @click="searchList"></i>
				</div>
				<div class="sec">
					<transition name="slideUp">
						<div class="color-list" v-if="pickColor">
							<div class="er-color-dblue color-pick" alt="dblue" @click="changeBack($event.target)"></div>
							<div class="er-color-blue color-pick" alt="blue" @click="changeBack($event.target)"></div>
							<div class="er-color-dgreen color-pick" alt="dgreen" @click="changeBack($event.target)"></div>
							<div class="er-color-green color-pick" alt="green" @click="changeBack($event.target)"></div>
							<div class="er-color-red color-pick" alt="red" @click="changeBack($event.target)"></div>
							<div class="er-color-purple color-pick" alt="purple" @click="changeBack($event.target)"></div>
							<div class="er-color-pink color-pick" alt="pink" @click="changeBack($event.target)"></div>
						</div>
					</transition>
					<i class="fa fa-paint-brush" title="Change Color" @click="showColorPick"></i>
				</div>
				<div class="sec"><i class="fa fa-star" title="Filter Favorite" @click="filterFav" :class=" this.filt? 'active' : '' "></i></div>
			</div>
		</div>
	`,
	mounted(){

	},
	watch:{
		current(v){			
			if(this.slist && v != null){
				this.mlist.map(v => {
					v.played = false
				})
				this.mlist[v].played = true
			}
		}
	},
	methods: {
		change(v, k){
			this.mlist.map(v => {
				v.played = false
			})

			this.mlist[k].played = true
			this.$emit("selected", v)
		},
		searchList(){
			this.mlist.map(v => {
				if(this.listSearch != ""){
					if(v["im:name"].label.toLowerCase().indexOf(this.listSearch)){
						v.show = false
					}else{
						v.show = true
					}
				}else{
					v.show = true
				}
			})
		},
		changeBack(e){
			let c = e.getAttribute("alt")
			let el = document

			this.$el.querySelectorAll(".color-pick").forEach(v => {
				v.classList.remove("active")
			})

			e.classList.add("active")

			window.localStorage.setItem("theme", c)

			el.body.removeAttribute("class")
			el.body.classList.add(`er-back-${c}`)
		},
		showColorPick(){
			let color = window.localStorage.getItem("theme")
			this.pickColor = !this.pickColor

			setTimeout(() => {
				this.$el.querySelector(`[alt='${color}']`).classList.add("active")
			}, 10)
		},
		filterFav(){
			this.filt = !this.filt
			this.$emit("filter")
		},
		showNowList(){
			this.slist = true
		}
	}
}

export default list