import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, FormGroup, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';



function RenderCampsite({campsite}){
        return(
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
    function RenderComments({comments, addComment, campsiteId}){
        if(comments){
            return(
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map(comment =>
                        <div key={comment.id}>
                            <p>{comment.text}</p>
                            <p>--{comment.author}, -{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        </div>)}
                        <CommentForm campsiteId={campsiteId} addComment={addComment} />
                </div>
            );
        }else{
            return(<div></div>)
        }
    }
    function CampsiteInfo(props){
        if(props.campsite){
            return(
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments comments={props.comments} 
                            addComment={props.addComment}
                            campsiteId={props.campsite.id}
                        />
                    </div>
                </div>

                );
        }
        if (props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        if (props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return(
                <div></div>
            );
        }
    }

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

    class CommentForm extends Component {
        constructor(props) {
            super(props);
            this.state={
                isModalOpen: false
            };
            this.toggleModal = this.toggleModal.bind(this);
        }

        handleSubmit(values) {
            this.toggleModal();
            this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
        }

        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }
        render(){
            return(
                <>
                <Button className="fa fa-pencil fa-lg" outline onClick={this.toggleModal}>Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <LocalForm className="ml-2 mr-2 mt-2" onSubmit={values => this.handleSubmit(values)}>
                        <div className="form-group">
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select name="rating" model=".rating" className="form-control">
                                    <option value="none" selected disabled hidden>Choose a Rating</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </FormGroup>
                        </div>
                        <div className="form-group">
                            <FormGroup>
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text name="author" model=".author" className="form-control" placeholder="Your Name" 
                                        validators={{
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}                                    
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                            </FormGroup>        
                        </div>
                        <div className="form-group">
                            <FormGroup>
                                <Label htmlFor="text">Comment</Label>
                                <Control.textarea name="text" model=".text" className="form-control" rows="6"></Control.textarea>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </div>
                    </LocalForm>
                </Modal>
                </>
            );
        }
    }

export default CampsiteInfo;