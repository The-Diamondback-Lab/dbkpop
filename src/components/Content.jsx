import React from 'react'
import YouTube from 'react-youtube-embed'
import Podcast from './Podcast'
import AwesomeSlider from 'react-awesome-slider'
import 'react-awesome-slider/dist/styles.css'
import sanitizeHtml from 'sanitize-html'
/**
 * @type {string[]}
 */
import contentData from '../data/content.json'

/**
 * @typedef GalleryData
 * @property {number} count How many gallery indicators/directives were found in the
 * paragraphs list
 * @property {number[][]} indices Maps the index of a gallery directive from `paragraphs` to which
 * directive count it was (i.e. `[15,1]` indicates directive at index 15 corresponds to the second
 * gallery, zero-indexed)
 */

/**
 * @typedef GalleryObjects
 * @property {GalleryData} data
 * @property {JSX.Element[]} galleries
 */

export default class Content extends React.Component {
  constructor(props) {
    super(props)

    this.generateContent = this.generateContent.bind(this)

    this.state = {
      /**
       * @type {string[]}
       */
      paragraphs: contentData
    }
  }

  /**
     * Generates all article content. If a directive is found but not handled
     * appropriately, then that directive is ignored and not generated in the
     * content.
     *
     * @returns {JSX.Element[]}
     */
  generateContent() {
    const { paragraphs } = this.state

    return paragraphs.reduce((elems, para, idx) => {
      if (para.match(/^BYLINE::/)) {
        const bylineText = para.split('BYLINE::')[1]
        elems.push(<span key={`gc-byline-${idx}`} className='byline'>{bylineText}</span>)
        return elems
      } else if (para.match(/^PODCAST::/)) {
        const podcastSrc = para.split('PODCAST::')[1]
        elems.push(<Podcast key={`gc-podcast-${idx}`} src={podcastSrc} />)
        return elems
      } else if (para.match(/^IMAGE::/)) {
        const imageSrc = para.split('IMAGE::')[1]
        elems.push(<img key={`gc-img-${idx}`} src={imageSrc} className="standalone-img" />)
        return elems
      } else if (para.match(/^VIDEO::/)) {
        const videoSrc = para.split('VIDEO::')[1]
        elems.push(<video key={`gc-video-${idx}`} src={videoSrc} preload='metadata' controls></video>)
        return elems
      } else if (para.match(/^YOUTUBE::/)) {
        const youtubeID = para.split('YOUTUBE::')[1]
        elems.push(<YouTube key={`gc-youtube-${idx}`} className="youtube-video" id={youtubeID} />)
        return elems
      } else if (para.match(/^CAPTION::/)) {
        elems.push(<div key={`gc-caption-${idx}`} className="caption">{para.split('CAPTION::')[1]}</div>)
        return elems
      } else if (para.match(/^GALLERY::/)) {
        const slideshowPic = JSON.parse(para.split('GALLERY::')[1])
        elems.push(<AwesomeSlider key={`gc-gallery-${idx}`} bullets={false}>
          {slideshowPic.map((picPath, picIdx) => <div key={`slider-${idx}-${picIdx}`} data-src={picPath}></div>)}
        </AwesomeSlider>)
        return elems
      } else if (para.match(/^HEADER::/)) {
        const text = para.split('HEADER::')[1]
        elems.push(<h3 key={`gc-h3-${idx}`}>{text}</h3>)
        return elems
      } else if (para.match(/^[A-Z]+::/)) {
        // Unhandled directive, skip over
        console.warn(`Unknown directive at index ${idx}`)
        return elems
      }

      elems.push(
        <p
          key={`content-paragraph-${idx}`}
          className='article-paragraph'
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(para) }}
        ></p>
      )

      return elems
    }, [])
  }

  render() {
    const articleContent = this.generateContent()

    return <div id='article-content'>{articleContent}</div>
  }
}
