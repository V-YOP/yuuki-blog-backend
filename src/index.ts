import express from 'express'
import { readFileSync } from 'fs'
import React from 'react'
import { bundleMdx } from './mdxUtil'
import * as ReactDOMServer from 'react-dom/server';
const app = express()

app.use('/', express.static('./static'))

app.use('/testPage', async (req,res) => {
  const mdx = readFileSync('./articles/HelloWorld.mdx').toString()
  const dep = {
    'COMPONENT/Counter.tsx': readFileSync('./articles/Counter.tsx').toString()
  }
  const component = await bundleMdx(mdx, dep, [])
  res.send(component.code)
})

app.listen(3000)