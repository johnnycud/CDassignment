import React from 'react';
import _ from 'lodash';
import api from './test/stubAPI';

class Form extends React.Component {
    state = { comment: '', name: '' };

    handleCommentChange = (e) => {
        this.setState({ comment: e.target.value });
    };

    handleNameChange = (e) => {
        this.setState({ name: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();
        let comment = this.state.comment.trim();
        let name = this.state.name.trim();
        if (!comment) {
            return;
        }
        this.props.commentHandler(comment, name);
        this.setState({ comment: '', name: '' });
    };

    render() {
        return (
            <form style={{ marginTop: '30px' }}>
                <h3>Add a new comment</h3>

                <div className="form-group">
                    <input type="text" className="form-control"
                        placeholder="Comment" value={this.state.comment}
                        onChange={this.handleCommentChange} ></input>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control"
                        placeholder="Your name" value={this.state.name}
                        onChange={this.handleNameChange} ></input>
                </div>
                <button type="submit" className="btn btn-primary"
                    onClick={this.onSubmit}>Submit</button>
            </form>
        );
    }
}

class Comment extends React.Component {
    handleVote = () => {
        this.props.upvoteHandler(this.props.comment.id);
    };
    render() {
        let lineStyle = {
            fontSize: '20px', marginLeft: '10px'
        };
        return (
            <div>
                <span className="glyphicon glyphicon-thumbs-up"
                    onClick={this.handleVote}></span>
                {this.props.comment.upvotes} - by {this.props.comment.author}
                <span style={lineStyle} >
                    {this.props.comment.comment}
                </span>
            </div>
        );
    }
}


class CommentList extends React.Component {
    render() {
        let items = comments.map((comment, index) => {
            return (
                <Comment key={index} comment={comment}
                    upvoteHandler={upvoteHandler} />
            );
        });
        return (
            <div>
                {items}
            </div>
            );
        };
    }
    class CommentView extends React.Component {
    addComment = (comment, name) => {
        let pid = parseInt(this.props.params.bloggId, 10);
        api.addComment(pid, comment, name);
        this.setState({});
    };

    incrementUpvote = (commentId) => {
        let pid = parseInt(this.props.params.bloggId, 10);
        api.upvoteComment(pid, commentId);
        this.setState({});
    };

    render() {
        let pid = parseInt(this.props.params.bloggId, 10);
        let blogg = api.getBlogg(pid);
        let line = null;
        if (blogg.link) {
            line = <a href={blogg.link} >
                {blogg.title} </a>;
        } else {
            line = <span>{blogg.title} </span>;
        }
        let comments = _.sortBy(blogg.comments, function (comment) {
            return - comment.upvotes;
        }
        );
        return (
            <div >
                <h3>{line} </h3>
                <CommentList comments={comments}
                    upvoteHandler={this.incrementUpvote} />
                <Form blogg={blogg} commentHandler={this.addComment} />
            </div>
        );
    }
}

export default CommentView;