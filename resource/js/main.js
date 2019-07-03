"use strict"

import temp from "../../layout/index.js"

Object.keys(temp).map(v => {
	Vue.component(v, {...temp[v]})
})

var app = new Vue({
	el: "#app",
	data(){
		return {
			music: null,
			allMusic: null,
			search: null,
			sshow: false,
			isMobile: false,
			slist: true,
			filtered: false,
			sSideList: false,
			listTitle: "iTunes Albums",
			countFav: 0
		}
	},
	created(){
		let c = window.localStorage.getItem("theme")
		if(c != null && c != ""){			
			document.body.removeAttribute("class")
			document.body.classList.add(`er-back-${c}`)
		}

		this.pList()
		this.setOwnership()
	},
	mounted(){
		this.setHeight()
		let width = window.innerWidth
		
		if(width < 800){
			this.isMobile = true

			this.$refs.playList.slist = true
		}
	},
	methods: {
		fetchList(url){
			return axios({
				method: 'get',
				url: url,
				responseType: 'json'
			})
		},
		pList(){
			this.fetchList('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
			.then(res => {
				res.data.feed.entry.map((v,k) => {
					v.played = false
					v.show = true
					v.favorite = false
					v.mid = k
				})
				this.$refs.playList.mlist = res.data.feed.entry
				this.allMusic = res.data.feed.entry
				
				console.log(res.data.feed)
			})
		},
		changeMusic(v,k){
			this.music = v
			this.setHeight()

			this.$refs.playList.slist = true
			this.$refs.playList.ltitle = "TOP 100 Albums"
			this.$refs.playList.current = k

			if(this.isMobile){
				this.slist = false
			}
		},
		searchAlbum(){
			this.allMusic.map(v => {
				if(this.search != ""){
					if(v["im:name"].label.toLowerCase().indexOf(this.search)){
						v.show = false
					}else{
						v.show = true
					}
				}else{
					v.show = true
				}
			})
		},
		showSearch(){
			this.sshow = !this.sshow
		},
		prev(){
			this.music = null	
			this.$refs.playList.mlist = this.allMusic	
			this.$refs.playList.ltitle = "iTunes Albums"

			if(this.isMobile){
				this.$refs.playList.slist = true
				this.slist = true
				setTimeout(() => {
					this.setHeight()
				}, 10)
			}else{
				this.$refs.playList.slist = false
			}

		},
		addFav(v){
			this.allMusic[v].favorite = !this.allMusic[v].favorite
			
			if(this.allMusic[v].favorite){
				this.countFav++
			}else{
				this.countFav--
			}

			this.$refs.playList.mlist = this.allMusic
		},
		fFav(){
			if(this.filtered){
				this.allMusic.map(v => {
					v.show = true
				})
			}else{
				this.allMusic.map(v => {
					if(!v.favorite){
						v.show = false
					}
				})
			}
			this.filtered = !this.filtered
		},
		setOwnership(){
			let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Decemeber"]
			let d = new Date()
			let y = d.getFullYear()
			let dd = d.getDate()
			let m = d.getMonth()
			let fd = `${month[m]} ${dd}, ${y}`

			console.log("%c iTunes TOP 100 Albums", "color: #ff2c65; font-size: 30px")
			console.warn("Designed and Created by: Earvin Rillera Cañaveral")
			console.warn("UX/UI Developer/Web Developer")
			console.warn("Visit my portfolio: https://ercportfolio.000webhostapp.com")
			console.warn("Started June 29, 2019")
		},
		setHeight(){
			let a = this.$el.querySelector(".er-playlist .actions").offsetHeight
			let t = this.$el.querySelector(".er-playlist .title").offsetHeight
			let doc = document.documentElement.clientHeight

			setTimeout(() => {
				if(this.$el.querySelector(".er-playlist ul") != null){
					if(this.isMobile){
						this.$el.querySelector(".er-playlist ul").setAttribute("style", `height: ${doc - (a + t)}px`)
					}else{
						this.$el.querySelector(".er-playlist ul").setAttribute("style", `height: calc(100% - ${a + t}px)`)
					}
				}
			}, 10)
		},
		compare(a, b) {
			const nameA = a["im:name"].label
			const nameB = b["im:name"].label

			let comparison = 0;
			if (nameA > nameB) {
				comparison = 1;
			} else if (nameA < nameB) {
				comparison = -1;
			}
			return comparison;
		}
	}
})