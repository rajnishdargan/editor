import { Component, OnInit } from '@angular/core';
import { observationEditorConfig, observationRubricsEditorConfig, questionSetEditorConfig,
   questionEditorConfig, surveyEditorConfig } from './data';
import ClassicEditor from '@project-sunbird/ckeditor-build-classic';
const configMapper = {
  questionSet: questionSetEditorConfig,
  question: questionEditorConfig,
  survey: surveyEditorConfig,
  observation: observationEditorConfig,
  rubrics: observationRubricsEditorConfig
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Sunbird Questionset Editor';
  editor: any = localStorage.getItem('editorType') || '';
  public editorConfig: any = configMapper[this.editor];
  public ckEditorLib: any;

  ngOnInit() {
    this.ckEditorLib = {
      classicEditor: ClassicEditor
    }
  }

  editorEventListener(event) {
    this.editor = undefined;
    localStorage.removeItem('editorType');
    console.log(event);
  }

  setType(editorType) {
    if (editorType === 'questionSet') {
      localStorage.setItem('editorType', 'questionSet');
    } else if (editorType === 'question') {
      localStorage.setItem('editorType', 'question');
    } else if (editorType === 'observation') {
      localStorage.setItem('editorType', 'observation');
    } else if (editorType === 'survey') {
      localStorage.setItem('editorType', 'survey');
    } else if (editorType === 'rubrics') {
      localStorage.setItem('editorType', 'rubrics');
    }
    window.location.reload();
  }
}
