import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import { Component } from 'react';
import { LinkToolbarAppearance } from '../card/ui/LinkToolbarAppearance';
export class HyperlinkToolbarAppearance extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      supportedUrlsMap: new Map()
    });

    _defineProperty(this, "getProvider", async () => {
      if (this.cardProvider) {
        return this.cardProvider;
      }

      return new Promise(resolve => {
        const {
          providerFactory
        } = this.props;
        providerFactory.subscribe('cardProvider', async (_, cardProvider) => {
          if (!cardProvider) {
            return;
          }

          this.cardProvider = await cardProvider;
          resolve(this.cardProvider);
        });
      });
    });

    _defineProperty(this, "resolveUrl", async url => {
      const {
        supportedUrlsMap
      } = this.state;

      if (supportedUrlsMap.has(url)) {
        return;
      }

      let isUrlSupported = false;

      try {
        const provider = await this.getProvider();
        isUrlSupported = await provider.findPattern(url);
      } catch (error) {
        isUrlSupported = false;
      }

      supportedUrlsMap.set(url, isUrlSupported);
      this.setState({
        supportedUrlsMap
      });
    });

    _defineProperty(this, "componentDidMount", () => this.resolveUrl(this.props.url));
  }

  // needed so we display the right state on the Toolbar while the same Toolbar
  // instance is visible and we click other link
  componentWillReceiveProps(nextProps) {
    if (nextProps.url !== this.props.url) {
      this.resolveUrl(nextProps.url);
    }
  }

  render() {
    const {
      url,
      intl,
      editorView,
      editorState,
      cardOptions,
      platform
    } = this.props;
    const {
      supportedUrlsMap
    } = this.state;

    if (!supportedUrlsMap.get(url)) {
      return null;
    }

    return /*#__PURE__*/React.createElement(LinkToolbarAppearance, {
      key: "link-appearance",
      url: url,
      intl: intl,
      editorView: editorView,
      editorState: editorState,
      allowEmbeds: cardOptions === null || cardOptions === void 0 ? void 0 : cardOptions.allowEmbeds,
      platform: platform
    });
  }

}