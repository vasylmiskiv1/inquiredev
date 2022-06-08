import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { PostsActionsCreator } from "../../redux/actions";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { dispatchStore } from "../../redux/store";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import "./Post.scss";

type Props = {
  post: Post;
};

export const Post: React.FC<Props> = ({ post }) => {
  const [dialogModal, setDialogModal] = useState(false);

  const onDeletePost = (id: number | string) => {
    dispatchStore(PostsActionsCreator.deletePost(id));
    setDialogModal(false);
  };

  return (
    <>
      {dialogModal && (
        <Dialog
          open={dialogModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>
            Do you really want to delete <span>{post.title}</span> post?
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => setDialogModal(false)}>Disagree</Button>
            <Button
              color="warning"
              onClick={() =>  onDeletePost(post.id)}
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Card
        sx={{ minWidth: 275, padding: 1 }}
        variant="outlined"
        className="post-card"
      >
        <CardContent>
          <Typography variant="h5" component="div" className="post-card-title">
            {post.title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {post.timestamp && `${post.timestamp}`}
          </Typography>

          <Typography variant="body1" sx={{ marginTop: 2 }}>
            {post.body}
          </Typography>
        </CardContent>

        <CardActions className="card-actions" sx={{ marginTop: 2 }}>
          <Link to={`/post/${post.id}`} className="card-view-post">
            <Button size="medium" variant="outlined">
              View post
            </Button>
          </Link>

          <Link to={`/edit/${post.id}`}>
            <Button size="medium">
              <ModeEditOutlinedIcon sx={{ fontSize: 25 }} color="primary" />
            </Button>
          </Link>

          <Button color="warning" onClick={() => setDialogModal(true)}>
            <DeleteOutlinedIcon sx={{ fontSize: 25 }} />
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
