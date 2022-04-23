module.exports = {
	content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
			backgroundImage: {
				'arrow': "url('./assets/arrow.svg')",
			},
			borderRadius: {
				'5': '5px',
			},
			colors: {
				'black': '#282828',
				'blue': '#11B3FE',
				'blue-hover': '#0095E0',
				'grey': '#80A2B6',
				'grey-border': '#E3EBEF',
				'grey-fill': '#F6F7F8',
				'grey-hover': '#EAF1F7',
				'red': '#E03F3F',
				'white': '#FFFFFF'
			},
			fontSize: {
				'16': '16px',
				'20': '20px',
				'40': '40px',
				'50': '50px',
			},
			height: {
				'30': '30px',
				'50': '50px',
			},
			inset: {
				'15': '15px',
				'30': '48px',
			},
			lineHeight: {
				'52': '52px',
			},
			margin: {
				'center': '0 auto',
				'1': '1px',
				'8': '8px',
				'14': '14px',
				'16': '16px',
				'25': '25px',
				'32': '32px',
				'60': '60px',
			},
			maxWidth: {
				'960': '960px',
			},
			padding: {
				'13': '13px',
				'14': '14px',
				'16': '16px',
				'17': '17px',
				'59': '59px',
				'119': '119px',
				'220': '220px',
			},
			screens: {
				'mobile' : {'max' : '360px'},
			},
			width: {
				'1': '1px',
				'20': '20px',
				'24': '24px',
				'100': '100px',
				'150': '150px',
				'178': '178px',
				'290': '290px',
				'328': '328px',
				'440': '440px',
				'723': '723px',
			},
		},
  },
  plugins: [],
}
