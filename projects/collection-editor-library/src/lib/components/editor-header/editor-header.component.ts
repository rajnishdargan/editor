import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { TreeService } from '../../services/tree/tree.service';
import { EditorService } from '../../services/editor/editor.service';
import { HelperService } from '../../services/helper/helper.service';
import { EditorTelemetryService } from '../../services/telemetry/telemetry.service';
import * as _ from 'lodash-es';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'lib-editor-header',
  templateUrl: './editor-header.component.html',
  styleUrls: ['./editor-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditorHeaderComponent implements OnDestroy, OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input() labelConfigData: any;
  @Output() toolbarEmitter = new EventEmitter<any>();
  @ViewChild('FormControl', {static: false}) FormControl: NgForm;
  private onComponentDestroy$ = new Subject<any>();
  public editorConfig: any;
  public visibility: any;
  public showReviewModal: boolean;
  public showRequestChangesPopup: boolean;
  public rejectComment: string;
  public contentComment: string;
  constructor(private editorService: EditorService, private treeService: TreeService,
    private helperService: HelperService, public telemetryService: EditorTelemetryService) { }

  ngOnInit() {
    this.handleActionButtons();
  }

  handleActionButtons() {
    this.visibility = {};
    this.visibility.saveContent = this.editorService.editorMode === 'edit';
    this.visibility.submitContent = this.editorService.editorMode === 'edit';
    this.visibility.rejectContent = this.editorService.editorMode === 'review';
    this.visibility.publishContent = this.editorService.editorMode === 'review';
  }

  buttonEmitter(action) {
    this.toolbarEmitter.emit({button: action.type, ...(action.comment && {comment: this.rejectComment})});
  }

  ngOnDestroy() {
    this.onComponentDestroy$.next();
    this.onComponentDestroy$.complete();
  }
}
