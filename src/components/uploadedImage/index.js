import { Component } from 'preact';
import { Image, Icon, Label } from 'semantic-ui-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import * as files from '../../api/file';
import style from './style';

class ProjectImage extends Component {
	state = {
		url: `${this.props.baseUrl}/storage/${this.props.id}/${this.props.file}`
	}

	removeFile = async () => {
		let response = await files.deleteOne(this.props.id, this.props.file);
		this.props.removeHandler();
	}

	render ({ file, baseUrl, id }, { url }) {
		return (
			<div>
				<div class={style.image}>
					<Image src={url} />
					<Icon name="remove" onClick={this.removeFile} />
					<CopyToClipboard text={url}>
						<Label attached="bottom left" className={style.image__label}>{file}</Label>
					</CopyToClipboard>
				</div>
			</div>
		);
	}
}

export default ProjectImage;
