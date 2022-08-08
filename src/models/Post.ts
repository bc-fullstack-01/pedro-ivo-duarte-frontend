interface Profile {
  _id: string;
  name: string;
}

interface Comment {
  _id: string;
  description: string;
  profile: Profile;
}

export interface Post {
  _id: string;
  title: string;
  description: string;
  profile: Profile;
  image: boolean;
  comments: Comment[];
  likes: string[];
}
