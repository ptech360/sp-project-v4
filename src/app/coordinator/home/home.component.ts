import { Component, AfterViewInit } from '@angular/core';
import { CoordinatorService } from "../coordinator.service";
import { StorageService } from "../../shared/storage.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Filters } from "../../shared/filters";

declare let $:any;

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [CoordinatorService]
})
export class HomeComponent extends Filters implements AfterViewInit{
  // goalsCopy: any[]=[];
  // goals: any[]=[];
  evidencForm:FormGroup;
  evidences:any[]=[];
  constructor(private utServ: CoordinatorService,
    private storage: StorageService) {
    super();
    this.getOpi();
    this.evidencForm = new FormGroup({
      title:new FormControl('',[Validators.required]),
      description:new FormControl('',Validators.required),
      files:new FormControl('',[Validators.required])
    });
  }

  ngAfterViewInit(){
    
  }
  public getOpi() {
    this.utServ.getOpiByDeptId(this.storage.getData('user_roleInfo')[0].departmentId).subscribe((response: any) => {
      if (response.status == 204) {
        this.goals = [];
        this.goalsCopy = []
      } else {
        this.goals = response;
        this.goalsCopy = response;
        
        this.initFilters(this.goalsCopy);
      }
    })
  }
  
  public showOpi(goal:any,measure:any){
    $('#edit-section').collapse('show');
    console.log(goal);
  }
  isUpdating:boolean = false;
  public saveQuarterResult(quarter:any){
    if(!quarter.isUpdating){     
      var object = {
                      'quarterId':quarter.id,
                      'currentCost':quarter.currentCost,
                      'currentTargetLevel':quarter.currentTargetLevel,
                  }
      this.utServ.saveQuarterResult(object).subscribe((response:any)=>{
        console.log(response);
        quarter.status='inprogress';
      })
    }else{
      let object = {
        'currentCost':quarter.currentCost,
        'currentTargetLevel':quarter.currentTargetLevel,
      }
      this.utServ.updateQuarterResult(quarter.id,object).subscribe((response:any)=>{
        console.log(response);
      });
    }
  }

  saveQuarterResultWithMou(lev:any){
    var object = {
      "currentCost":lev.currentCost,
      "mouType":lev.mouType,
      "organization":lev.organization
    }
    this.utServ.saveQuarterResultWithMou(lev.id,object).subscribe((response:any)=>{
      this.getOpi();
    });
  }

  updateMou(mou:any){
    var object = {
      // "mouResultId": mou.id,
      "mouType": mou.mouType,
      "organization": mou.organization
      }
      this.utServ.updateMou(mou.id,object).subscribe((response:any)=>{
        mou.edit=false;
      })
  }

  deleteMou(mous:any[],mou:any,index:any){
    if(confirm("Are you sure you want to delete this mou"))
    this.utServ.deleteMou(mou.id).subscribe((response:any)=>{
      mous.splice(index,1);
    })
  }

  lockQuarterResult(quarter:any){
    this.utServ.updateQuarterResult(quarter.id,{'status':'locked'}).subscribe((response:any)=>{
      console.log(response);
    });
  }

  deleteEvidence(evidences:any[],evidence:any,index:any){
    if(confirm("Are you sure you want to delete this evidence"))
    this.utServ.deleteEvidence(evidence.id).subscribe((response:any)=>{
      evidences.splice(index,1);
    })
  }

  deleteInternshipEvidence(evidences:any[],evidence:any,index:any){
    this.utServ.deleteInternshipEvidence(evidence.id).subscribe((response:any)=>{
      console.log("success");
    })
  }

  file:any;
  getFile(event:any) {
    this.file = event.srcElement.files[0];
  }
  selectedQuarter:any;
  selectedInternshipFile:any;
  selectedMou:any;
  onEvidenceSubmit(evForm:any){
    console.log(evForm);

    let formData = new FormData();
    formData.append('title',this.evidencForm.value['title']);
    formData.append('description',this.evidencForm.value['description']);
    formData.append('file',this.file);

    switch (evForm) {
      case 0:
        this.utServ.saveEvidence(formData,this.selectedQuarter.id).subscribe((res:any)=>{
          if(!this.selectedQuarter.evidance)
            this.selectedQuarter.evidance = [];
          this.selectedQuarter.evidance.push(res);
          $('#evidenceForm').modal('hide');
        });
      break;
      case 1:
        this.utServ.saveEvidenceForInternshipFile(formData,this.selectedInternshipFile.id).subscribe((response:any)=>{
          this.selectedInternshipFile.evidance.push(response);
          $('#evidenceForm').modal('hide');
        })
      break;
      case 2:
        this.utServ.saveEvidenceForMou(formData,this.selectedMou.id).subscribe((response:any)=>{
          this.selectedMou.evidance.push(response);
          $('#evidenceForm').modal('hide');
        })
      break;
    }
  }

  saveInternshipForm(lev:any){
    var formData = new FormData();
    // formData.append('internshipEvidance',lev.internshipEvidance);
    formData.append('internshipFile',lev.internshipFile);
    formData.append('currentCost',lev.currentCost);

    console.log(formData);
    this.utServ.saveQuarterWithInternship(lev.id,formData).subscribe((response:any)=>{
      lev.internshipDetails = response.internshipDetails;
    })
  }

  deleteInternshipFile(files:any[],file:any,index:any){
    if(confirm("Are you sure you want to delete this file"))
    this.utServ.deleteInternshipFile(file.id).subscribe((response:any)=>{
      files.splice(index,1);
    })
  }

}