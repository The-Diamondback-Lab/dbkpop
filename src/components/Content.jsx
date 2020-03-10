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
 * @type {string[]}
 */
import imageData from '../data/images.json'

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

    const images = imageData.map((filePath) => {
      return {
        original: filePath,
        thumbnail: filePath
      }
    })

    this.splitImages = this.splitImages.bind(this)
    this.generateContent = this.generateContent.bind(this)

    this.state = {
      /**
       * @type {string[]}
       */
      paragraphs: contentData,
      /**
       * @type {string[]}
       */
      images: images
    }
  }

  /**
   * Splits this component's state images into sets.
   * @param {number} count How many sets to split the images into
   * @returns {string[][]}
   */
  splitImages(count) {
    const { images } = this.state

    const sets = []
    let start = 0
    const imageCount = Math.ceil(images.length / count)

    for (let i = 0; i < count; i++) {
      sets.push(images.slice(start, start + imageCount))
      start += imageCount
    }

    return sets
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
      if (para.match(/^PODCAST::/)) {
        const podcastSrc = para.split('PODCAST::')[1]
        elems.push(<Podcast key={`podcast-${idx}`} src={podcastSrc} />)
        return elems
      } else if (para.match(/^IMAGE::/)) {
        const imageSrc = para.split('IMAGE::')[1]
        elems.push(<img src={imageSrc} className="standalone-img" />)
        return elems
      } else if (para.match(/^YOUTUBE::/)) {
        const youtubeID = para.split('YOUTUBE::')[1]
        elems.push(<YouTube className="youtube-video" id={youtubeID} />)
        return elems
      } else if (para.match(/^CAPTION::/)) {
        elems.push(<div className="caption">{para.split('CAPTION::')[1]}</div>)
        return elems
      } else if (para.match(/^GALLERY::/)) {
        const slideshowPic = JSON.parse(para.split('GALLERY::')[1])
        elems.push(<AwesomeSlider bullets={false}>
          {slideshowPic.map((picPath, picIdx) => <div key={`slider-${idx}-${picIdx}`} data-src={picPath}></div>)}
        </AwesomeSlider>)
        return elems
      } else if (para.match(/^HEADER::/)) {
        const text = para.split('HEADER::')[1]
        elems.push(<h3>{text}</h3>)
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
