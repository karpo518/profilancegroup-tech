import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
  myLinks: { 
    nodes: [
      { id: 1, url: 'https://google.ru/', short_url: 'http://test-task.profilancegroup-tech.com/s/abc', clicks: 5},
      { id: 2, url: 'https://yandex.ru/', short_url: 'http://test-task.profilancegroup-tech.com/s/bac', clicks: 2},
      { id: 3, url: 'https://rambler.ru/', short_url: 'http://test-task.profilancegroup-tech.com/s/cba', clicks: 12},
    ]
  },
  allLinks: {
    nodes: [],
    pagination: { 
      total: 0,
      currentPage: 1
    }
  },
  wereNewClicks: false,
}

const findLinkIndexById = (links, linkId) => {

  for(let i = 0; i < links.length; i++) {
    
    if(parseInt(links[i]['id']) === linkId) {
      return i
    }
  }

  return false
}

export const shortLinksSlice = createSlice({
  name: 'shortLinks',
  initialState,
  reducers: {
    addMyLink: (state, action) => {
      state.myLinks.nodes.push(action.payload)
    },
    setAllLinksNodes: (state, action) => {
      state.allLinks.nodes = action.payload
    },
    setAllLinksTotal: (state, action) => {
      state.allLinks.pagination.total = action.payload
    },
    setAllLinksCurrentPage: (state,action) => {
      state.allLinks.pagination.currentPage = action.payload
    },
    setClicks: (state, action) => {
      
      const {payload: {id, clicks} } = action

      state.wereNewClicks = true

      let index = findLinkIndexById(current(state.myLinks.nodes), id)
      if(index !== false) {
        state.myLinks.nodes[index]['clicks'] = clicks
      }

      index = findLinkIndexById(current(state.allLinks.nodes), id)
      if(index !== false) {
        state.allLinks.nodes[index]['clicks'] = clicks
      }

    }
  },
})

// Action creators are generated for each case reducer function
export const { addMyLink, setAllLinksNodes, setAllLinksTotal, setAllLinksCurrentPage, setClicks } = shortLinksSlice.actions

export const shortLinksReducer =  shortLinksSlice.reducer