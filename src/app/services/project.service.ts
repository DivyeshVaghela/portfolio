import { Injectable } from '@angular/core';
import { Project } from '../models/Project.model';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projects: Project[];
  /* = [
    {
      id: 1,
      title: 'Charmed Circle',
      subtitle: 'Local Community',
      details: "A community has been defined as a group of interacting people living in a common location. A sense of community refers to people's perception of interconnection and interdependence, shared responsibility, and common goals.\n\nThis project is to encourage collaboration, better communication, problem solving and support from other members within the local community. This mobile application allows users to create new communities, join the local communities based on the GeoLocation. It also allows community members to collaborate by posting various feeds, asking questions and providing answers to other questions and chat facility that will help community members to discuss on some topic and get to a strong conclusion.",
      type: ['Mobile app'],
      frontTechnologies: ['Ionic', 'Angular'],
      backTechnologies: ['Google Firebase'],
      database: ['Firestore'],
      logo: 'assets/img/projects/charmed-circle-logo.png',
      showcaseImage: 'assets/img/projects/charmed-circle.jpg',
      screenshots: [
        { image: 'assets/img/projects/CC-Sign in.PNG', caption: 'Sign in' }, 
        { image: 'assets/img/projects/CC-Home.PNG', caption: 'Home'},
        { image: 'assets/img/projects/CC-Communities List.PNG', caption: 'List of Communities of selected location'},
        { image: 'assets/img/projects/CC-Community Details.PNG', caption: 'Details of a Community'},
        { image: 'assets/img/projects/CC-Posts 3.PNG', caption: 'Posts in a Community'},
        { image: 'assets/img/projects/CC-Post Details with Image.PNG', caption: 'Posts Details'},
        { image: 'assets/img/projects/CC-Questions.PNG', caption: 'Questions in a Community'},
        { image: 'assets/img/projects/CC-Answers.PNG', caption: 'Answers of one of the Questions'},
        { image: 'assets/img/projects/CC-Dicussions 2.PNG', caption: 'Discussions in a Community'},
        { image: 'assets/img/projects/CC-Discussion Chat.PNG', caption: 'Discussion Chat'},
      ],
      github: 'https://github.com/DivyeshVaghela/CharmedCircle'
    },
    {
      id: 2,
      title: 'Jan Jagruti',
      subtitle: 'Material Distribution',
      details: 'Course material distribution is an important facet in today’s continuously learning phase. In traditional system, this process includes, the dispatch of print material, Audio and Video CDs/DVDs and other supplementary materials. The effectiveness of distance learning mostly depends on the efficient distribution of course materials to students in advance.\n\nThe Web app enables admin users to upload different types (formats) of materials like PDF, DOC, JPG, GIF, etc. and gives them capability to manage the uploaded materials, like subject wise, user wise and material format wise. All the learners will be able to register and access materials through Android app.\n\nThis app also has easy package subscription and payment integration. Admins can create and manage various packages and add materials that can be accessed only by appropriate subscribers.',
      type: ['Mobile app', 'Web app'],
      frontTechnologies: ['Android', 'AngularJS'],
      backTechnologies: ['Node.js (Restify)'],
      database: ['MySQL'],
      logo: 'assets/img/projects/jan-jagruti-logo.png',
      showcaseImage: 'assets/img/projects/jan-jagruti.jpg', 
      screenshots: [
        { image: 'assets/img/projects/JJ-Login.PNG', caption: 'Login Page' },
        { image: 'assets/img/projects/JJ-Registration.PNG', caption: 'Registration Page' },
        { image: 'assets/img/projects/JJ-Dashboard.PNG', caption: 'Subjects shown in dashboard' },
        { image: 'assets/img/projects/JJ-Materials.PNG', caption: 'Materials of a subject' },
        { image: 'assets/img/projects/JJ-Material Details.PNG', caption: 'Details of a material' },
        { image: 'assets/img/projects/JJ-PDF Viwer.PNG', caption: 'PDF Viewer for PDF type material' },
        { image: 'assets/img/projects/JJ-Packages.PNG', caption: 'Package for Premium Membership' },
        { image: 'assets/img/projects/JJ-Payment.PNG', caption: 'Payment while package purchase' },

        { image: 'assets/img/projects/JJ-Subjects List.png', caption: 'Admin - List of Subjects' },
        { image: 'assets/img/projects/JJ-Materials List.png', caption: 'Admin - List of Materials in a subject' },
        { image: 'assets/img/projects/JJ-Material Details.png', caption: 'Admin - Material Details' },
        { image: 'assets/img/projects/JJ-Material Create.png', caption: 'Admin - Add a material' },
        { image: 'assets/img/projects/JJ-Package List.png', caption: 'Admin - List of packages for premium membership' },
      ],
      github: 'https://github.com/DivyeshVaghela/JanJagruti',
    },
    {
      id: 3,
      title: "Readers'",
      subtitle: 'Private Virtual Library',
      details: "'There is no friend as loyal as a book'\n\nReading enthusiastics always finds it difficult to manage all the books, especially eBooks. This web application tries to solve this problem. A reader will be able to register and can create his/her own Virtual Library. Reader will be able to share the books with their friends and also will be able to create groups and share books in those groups also.",
      type: ['Web app'],
      frontTechnologies: ['HTML', 'CSS', 'JavaScript/jQuery'],
      backTechnologies: ['Java Spring', 'Hibernate'],
      database: ['MySQL'],
      logo: 'assets/img/projects/readers-logo.png',
      showcaseImage: 'assets/img/projects/readers.jpg',
      screenshots: [
        { image: 'assets/img/projects/RD-Home Readers.png', caption: 'Home Page' },
        { image: 'assets/img/projects/RD-Book share history.png', caption: 'Book Sharing History' },
        { image: 'assets/img/projects/RD-College Group.png', caption: 'Readers\' Group' },
        { image: 'assets/img/projects/RD-Java Spring Readlist.png', caption: 'Readlist' },
        { image: 'assets/img/projects/RD-eBook Details.png', caption: 'Book Details' },
        { image: 'assets/img/projects/RD-New Ebook.png', caption: 'Add a Book to Virtual Library' },
        { image: 'assets/img/projects/RD-Update Book Read Details.png', caption: 'Track the progress' },
      ],
      github: 'https://github.com/DivyeshVaghela/readers'
    }
  ]*/

  constructor(
    private afStore: AngularFirestore
  ) { }

  list(reverse: boolean = false, limit?: number): Observable<Project[]>{
    return this.afStore.collection<Project>(
      '/projects',
      ref => {
        let query = ref.orderBy('sequenceNo', reverse == null || reverse ? 'desc':'asc');
        if (limit) query = query.limit(limit);
        return query;
      }
      ).valueChanges({idField: 'id'});
    // return of(this.projects.slice(0, limit ? limit : this.projects.length));
  }

  get(projectId: string): Observable<Project>{
    return this.afStore.doc<Project>(`/projects/${projectId}`).valueChanges()
    // return of(this.projects.find(project => project.id == projectId));
  }


}
