import React from 'react';
import localCache from './localCache';
import request from 'superagent';

class Specification extends React.Component {
    render() {
        let site = this.props.site;
        let availability = site.availability.map(function (avb, index) {
            return <dd key={index}>{avb}</dd>;
        });
        let dimensions = site.sizeAndWeight.dimensions.map(function (dim, index) {
            return <dd key={index}>{dim}</dd>;
        });
        let display = (
            <div>
                <ul className="specs">
                    <li >
                        <span>Availability and Networks</span>
                        <dl>
                            <dt>Availability</dt>
                            {availability}
                        </dl>
                    </li>
                    <li>
                        <span>Channel</span>
                        <dl>
                            <dt>Year</dt>
                            <dd>{site.channel.year}</dd>
                            <dt>Talk Time</dt>
                            <dd>{site.channel.talkTime}</dd>
                            <dt>Air time (max)</dt>
                            <dd>{site.channel.airTime}</dd>
                        </dl>
                    </li>
                    <li>
                        <span>Crew and Cast</span>
                        <dl>
                            <dt>Captain</dt>
                            <dd>{site.crew.captain}</dd>
                            <dt>First Officer</dt>
                            <dd>{site.crew.fOfficer}</dd>
                        </dl>
                    </li>
                    <li>
                        <span>Crew</span>
                        <dl>
                            <dt>Doctor</dt>
                            <dd>{site.crew.doctor}</dd>
                            <dt>Engineer</dt>
                            <dd>{site.crew.engineer}</dd>
                            <dt>Science Officer</dt>
                            <dd>{site.crew.sOfficer}</dd>
                        </dl>
                    </li>
                    <li>
                        <span>Android</span>
                        <dl>
                            <dt>OS Version</dt>
                            <dd>{site.android.os}</dd>
                            <dt>UI</dt>
                            <dd>{site.android.ui}</dd>
                        </dl>
                    </li>
                    <li>
                        <span>Size and Weight</span>
                        <dl>
                            <dt>Dimensions</dt>
                            {dimensions}
                            <dt>Weight</dt>
                            <dd>{site.sizeAndWeight.weight}</dd>
                        </dl>
                    </li>
                    <li>
                        <span>Display</span>
                        <dl>
                            <dt>Screen size</dt>
                            <dd>{site.display.screenSize}</dd>
                            <dt>Screen resolution</dt>
                            <dd>{site.display.screenResolution}</dd>
                            <dt>Touch screen</dt>
                            <dd>{site.display.touchScreen}</dd>
                        </dl>
                    </li>
                    <li>
                        <span>Hardware</span>
                        <dl>
                            <dt>CPU</dt>
                            <dd>{site.hardware.cpu}</dd>
                            <dt>USB</dt>
                            <dd>{site.hardware.usb}</dd>
                            <dt>Audio / headsite jack</dt>
                            <dd>{site.hardware.audioJack}</dd>
                            <dt>FM Radio</dt>
                            <dd>{site.hardware.fmRadio}</dd>
                            <dt>Accelerometer</dt>
                            <dd>{site.hardware.accelerometer}</dd>
                        </dl>
                    </li>
                    <li>
                        <span>Camera</span>
                        <dl>
                            <dt>Primary</dt>
                            <dd>{site.camera.primary}</dd>
                            <dt>Features</dt>
                            <dd>{site.camera.features.join(', ')}</dd>
                        </dl>
                    </li>
                    <li>
                        <span>Additional Features</span>
                        <dd>{site.additionalFeatures}</dd>
                    </li>
                </ul>
            </div>
        )
        return (
            <div>
                {display}
            </div>
        );
    }
};


class ImagesSection extends React.Component {
    render() {
        var thumbImages = this.props.site.images.map(function (img, index) {
            return (
                <li>
                    <img key={index} src={"/sites/" + img}
                        alt="missing" />
                </li>
            );
        });
        var mainImage = (
            <div className="site-images">
                <img src={"/sites/" + this.props.site.images[0]}
                    alt={this.props.site.name}
                    className="site" />
            </div>
        );
        return (
            <div>
                {mainImage}
                <h1>{this.props.site.name}</h1>
                <p>{this.props.site.description}</p>
                <ul className="site-thumbs">
                    {thumbImages}
                </ul>
            </div>
        );
    }
};

class siteDetail extends React.Component {
    state = {};

    componentDidMount() {
        request.get(
            '/sites/cast/' + this.props.params.id + '.json', (err, res) => {
                let json = JSON.parse(res.text);
                localCache.setsite(json);
                this.setState({});
            });
    }

    render() {
        let display = <p>No site details</p>;
        let site = localCache.getsite();
        if (site) {
            display = (
                <div>
                    <ImagesSection site={site} />
                    <Specification site={site} />
                </div>
            );
        }
        return (
            <div>
                {display}
            </div>
        );
    }
};

export default siteDetail;